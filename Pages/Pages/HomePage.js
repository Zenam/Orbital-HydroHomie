import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '../firebaseDb.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input';
import ProgressCircle from 'react-native-progress-circle';
import BlueButton from '../Components/BlueButton.js';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drinkAmount: 0,
        }
    }

    componentDidMount() {
        var user = firebase.auth().currentUser
        if (user) {
            var dbRef = firebase.firestore().collection('users').doc(user.uid)
            dbRef.get()
            .then(documentSnapShot => {
                var data = documentSnapShot.data();
                this.setState({toDrink: data.dayInfo.goal,
                            start: data.DailyTarget,
                            totalDrank: data.dayInfo.total,
                            currentDate: data.dayInfo.currentDate.toDate()
                            })
            })
        }
    }

    componentDidUpdate() {
        var user = firebase.auth().currentUser
        var dbRef = firebase.firestore().collection('users').doc(user.uid)
        var newDate = new Date()
        var currentD = this.state.currentDate
        var diff = this.compareDate(currentD, newDate)

        dbRef.get()
        .then(documentSnapShot => {
            var data = documentSnapShot.data();
            if (data.DailyTarget != this.state.start) {
                this.setState({toDrink: data.dayInfo.goal,
                            start: data.DailyTarget,
                            totalDrank: data.dayInfo.total,
                            currentDate: data.dayInfo.currentDate.toDate()
                            })
            }
        })

        if (!(diff)) {
            dbRef.update({
                dayInfo: {
                    goal: this.state.start,
                    total:0,
                    currentDate:newDate
                }
            })
            dbRef.collection('History').add({
                date: currentD,
                /*year: currentD.getFullYear(), 
                month: currentD.getMonth() + 1, 
                day: currentD.getDate(),*/ 
                drank: this.state.totalDrank})
            this.setState({toDrink: this.state.start, totalDrank: 0, currentDate: newDate})
        }
    }


    compareDate = (d1,d2) => {
        if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() == d2.getDate()) {
            return true
        } else {
            return false
        }
    }

    render() {

        var user = firebase.auth().currentUser
        var dbRef = firebase.firestore().collection('users').doc(user.uid)

        const {drinkAmount, toDrink, totalDrank, start, currentDate} = this.state
        
        var per = (totalDrank/start)*100
        return (
            <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>
                <ImageBackground 
                source = {{uri:'https://images.wallpaperscraft.com/image/under_water_depth_bottom_139714_800x1420.jpg'}}
                imageStyle = {styles.background}
                style = {{width:Dimensions.get('window').width, height: Dimensions.get('window').height}}
                >
                <View style = {styles.target}>
                    <Text style = {styles.header1}>Daily Target:</Text>
                    <Text style = {styles.subheader}> {toDrink} ml</Text>
                    <Text style = {styles.header2}>Amount Drank:</Text>
                    <Text style = {styles.subheader}>{totalDrank} ml</Text>
                </View>

                <View style = {styles.ring}>
                <ProgressCircle 
                    percent = {Number((per).toFixed(1))}
                    radius = {140}
                    borderWidth = {15}
                    color = {'skyblue'}
                    shadowColor = {'gainsboro'}
                    //bgColor = {'whitesmoke'}
                    containerStyle = {{paddingLeft: 12}}>
                        <Text style = {styles.ringText}>{
                            (per>100) ? 100.00 : per.toFixed(1)
                        }%
                        </Text>
                        <Text style = {styles.ringText}>COMPLETED</Text>
                </ProgressCircle>
                </View>

                <TouchableOpacity style = {styles.sync} 
                                  onPress = {() => {Alert.alert(
                                    "Sync Daily Target?",
                                    "Daily Target will be updated",
                                    [
                                      {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                      },
                                      { text: "OK", onPress: () => {
                                          this.forceUpdate()
                                            }
                                        }
                                    ],
                                    { cancelable: false })}}
                                    >
                        <Ionicons name={'ios-refresh'} size = {35} color= 'steelblue'/>
                </TouchableOpacity>

                <View style = {styles.number}>
                    <NumericInput
                    type = 'plus-minus'
                    onChange = {input => this.setState({drinkAmount:input})}
                    step ={50}
                    initValue = {drinkAmount}
                    minValue = {0}
                    totalHeight = {35}
                    totalWidth = {180}
                    rounded = {true}
                    rightButtonBackgroundColor = 'steelblue'
                    leftButtonBackgroundColor = 'lightsteelblue'
                    borderColor= 'white'
                    iconStyle = {{color:'white'}}
                    />
                </View>
                <View style = {styles.buttons}>
                    <TouchableOpacity style = {styles.undo}
                    onPress = { () => {Alert.alert(
                        "UnDrink",
                        "Are you sure you want to undrink " + drinkAmount + 'ml of water?',
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => 
                          { 
                            var left = totalDrank - drinkAmount
                            var newGoal = toDrink + drinkAmount
                            if (left < 0) {
                                if (newGoal > start) {
                                    dbRef.update({
                                        dayInfo: {
                                            goal: start,
                                            total: 0,
                                            currentDate: currentDate
                                        }
                                    })
                                    this.setState({toDrink: start, totalDrank: 0, drinkAmount: 0})
                                } else {
                                    dbRef.update({
                                        dayInfo: {
                                            goal: newGoal,
                                            total: 0,
                                            currentDate: currentDate
                                        }
                                    })
                                    this.setState({toDrink: newGoal, totalDrank: 0, drinkAmount: 0})
                                }
                            } else if (newGoal > start) {
                                dbRef.update({
                                    dayInfo: {
                                        goal: start,
                                        total: left,
                                        currentDate: currentDate
                                    }
                                })
                                this.setState({toDrink: start, totalDrank: left, drinkAmount: 0})
                            } else {
                                dbRef.update({
                                    dayInfo: {
                                        goal: toDrink + drinkAmount,
                                        total: left,
                                        currentDate: currentDate
                                    }
                                })
                                this.setState({toDrink: toDrink + drinkAmount, totalDrank: left, drinkAmount: 0})
                            }
                          }}
                        ],
                        { cancelable: false }
                      )
                    }}>
                        <Ionicons name = {'ios-undo'} size = {65} color = {'steelblue'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.drinkButton}
                    onPress = { () => {
                        var left = toDrink - drinkAmount
                        if (left < 0) {
                            dbRef.update({
                                dayInfo: {
                                    goal: 0,
                                    total: totalDrank + drinkAmount,
                                    currentDate: currentDate
                                }
                            })
                            this.setState({drinkAmount: 0, toDrink: 0, totalDrank: totalDrank + drinkAmount})
                        } else {
                            dbRef.update({
                                dayInfo: {
                                    goal: left,
                                    total: totalDrank + drinkAmount,
                                    currentDate: currentDate
                                }
                            })
                            this.setState({drinkAmount: 0, toDrink: left, totalDrank: totalDrank + drinkAmount})
                        }
                    }}>
                        <Text style = {styles.text}>Drink</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.reset}
                    onPress = {() => {Alert.alert(
                        "Warning",
                        "Confirm restart daily goal?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {
                              //myStore.dispatch(reset(myStore.getState().target))                        
                            dbRef.update({
                                dayInfo: {
                                    goal: start,
                                    total: 0,
                                    currentDate: currentDate
                                }
                            })
                            this.setState({toDrink: start, totalDrank: 0, drinkAmount: 0})
                        }}
                        ],
                        { cancelable: false }
                      )}}>
                        <Ionicons name = {'md-sync'} size = {65} color = {'steelblue'} />
                    </TouchableOpacity>
                </View>
                
                </ImageBackground> 
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
    },
    background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.2
    },
    sync: {
        //height: Dimensions.get('window').height*0.05,
        alignContent: 'center',
        //width: Dimensions.get('window').width*0.15,
        marginHorizontal: Dimensions.get('window').width*0.465,
        paddingTop: Dimensions.get('window').height*0.005,
        paddingBottom: Dimensions.get('window').height*0.005,
        marginBottom: Dimensions.get('window').height*0.01,
        borderColor: 'skyblue'
    },
    target: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
    },
    header1: {
        marginTop: Dimensions.get('window').height*0.15,
        paddingBottom: Dimensions.get('window').height*0.035,
        fontSize: 25,
        color: 'steelblue'
    },
    header2: {
        marginTop: Dimensions.get('window').height*0.01,
        fontSize: 25,
        color: 'steelblue'
    },
    subheader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: Dimensions.get('window').height*0.035,
        paddingVertical: Dimensions.get('window').height*0.003,
        marginTop: Dimensions.get('window').height*0.005,
        backgroundColor: 'skyblue',
        borderRadius: 12,
        overflow: 'hidden'
    },
    text: {
        color: 'white',
        fontSize: 25,
        borderRadius: 25,
        backgroundColor: 'skyblue',
        overflow: 'hidden',
        paddingHorizontal: Dimensions.get('window').height*0.07,
        paddingVertical: Dimensions.get('window').height*0.01,
        marginBottom: Dimensions.get('window').height*0.035,
        marginLeft: Dimensions.get('window').height*0.065
    },
    ring: {
        paddingTop: Dimensions.get('window').height*0.058,
        paddingBottom: Dimensions.get('window').height*0.04,
        paddingHorizontal: 70
    },
    ringText: {
        fontSize: 20,
        color: 'steelblue',
        fontWeight: 'bold',
    },
    number: {
        paddingHorizontal:Dimensions.get('window').height*0.132
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: Dimensions.get('window').height*0.1
    },
    undo: {
        paddingLeft: Dimensions.get('window').height*0.038,
        marginTop: Dimensions.get('window').height*0.008
    },
    drinkButton: {
        paddingTop: Dimensions.get('window').height*0.0175,
        marginRight: Dimensions.get('window').height*0.0175,
        marginLeft: -Dimensions.get('window').height*0.04
    },
    reset: {
        marginTop: Dimensions.get('window').height*0.009,
        marginLeft: Dimensions.get('window').height*0.014,
        marginRight: Dimensions.get('window').height*0.045
    }
})