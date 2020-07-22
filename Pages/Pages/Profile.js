import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Alert } from 'react-native';
import BlueButton from '../Components/BlueButton';
import firebase from '../firebaseDb.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';

export default class Profile extends Component {
    state = {
        height: 0,
        weight: 0,
        age: 0,
        gender: '',
        exercise: 0,
        Target: 0,
    }

    componentDidMount() {
        var user = firebase.auth().currentUser
        if (user) {
            var dbRef = firebase.firestore().collection('users').doc(user.uid)
            dbRef.get()
            .then(documentSnapShot => {
                var data = documentSnapShot.data();
                this.setState({
                            height: data.BasicInfo.Height,
                            weight: data.BasicInfo.Weight,
                            age: data.BasicInfo.Age,
                            gender: data.BasicInfo.Gender,
                            exercise: data.BasicInfo.Exercise,
                            Target: data.DailyTarget
                            })
            })
        }
    }

    updateHeight = (newHeight) => {
            this.setState({height: newHeight});
        }

    updateWeight = (newWeight) => {
                this.setState({weight: newWeight});
        }

    updateAge = (newAge) => {
                this.setState({age: newAge});
        }

    updateGender = (newGender) => {
                this.setState({gender: newGender});
        }

    updateExercise = (newExercise) => {
            this.setState({exercise: newExercise});
        }
    
    updateDailyTarget = (newTarget) => {
            this.setState({Target: newTarget});
    }

    render() {
        const {height, weight, age, gender, exercise, Target} = this.state;
        var data = [{value: 0}, {value: 15}, {value: 30}, {value: 45}, 
            {value: 60}, {value: 75}, {value: 90}, {value: 105}, {value: 120}, 
            {value: 135}, {value: 150}, {value: 165}, {value: 180}]
        return (
            <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}>
                <Text style = {styles.header}>
                    Personal Information
                </Text>

                <View style = {styles.input}>
                    <Text style = {styles.subHeader}>
                        Height in centimetres:
                    </Text>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {this.updateHeight}
                        value = {height}
                        keyboardType = 'numeric'
                    />

                    <Text style = {styles.subHeader}>
                        Weight in kilograms:
                    </Text>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {this.updateWeight}
                        value = {weight}
                        keyboardType = 'numeric'
                    />

                    <Text style = {styles.subHeader}>
                        Age in years:
                    </Text>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {this.updateAge}
                        value = {age}
                        keyboardType = 'numeric'
                    />

                    <Dropdown 
                    label = 'Sex:'
                    data = {[{value: 'Male'}, {value: 'Female'}]}
                    onChangeText = {this.updateGender}
                    selectedItemColor = 'skyblue'
                    labelFontSize = {16}
                    value = {gender}
                    baseColor = 'skyblue'
                    containerStyle = {{marginVertical: Dimensions.get('window').height*0.0175}}
                    />

                    <Dropdown 
                    label = 'Average Daily Exercise:'
                    data = {data}
                    onChangeText = {this.updateExercise}
                    selectedItemColor = 'skyblue'
                    labelFontSize = {16}
                    value = {exercise}
                    baseColor = 'skyblue'
                    />
                    
                    <BlueButton style = {styles.button}
                    onPress = {() => {
                        if (height < 1) {
                            this.setState({
                                height: ''
                            })
                            alert('Please enter a valid value for height.')
                        } else if (weight < 1) {
                            this.setState({
                                weight: ''
                            })
                            alert('Please enter a valid value for weight.')
                        } else if (age < 1) {
                            this.setState({
                                age: ''
                            })
                            alert('Please enter a valid value for age.')
                        } else {
                            var currentUser = firebase.auth().currentUser.uid;
                            var x;
                            if (age <= 30) {
                                x = weight*40
                            } else if (age <= 55) {
                                x = weight*35
                            } else {
                                x = weight*30
                            }
                            var oz = (x/28.3) + ((exercise/15)*10)
                            var ml = (oz/33.8)*1000
                            var target = Math.ceil(ml/100) * 100;
                            firebase.firestore()
                                .collection('users')
                                .doc(currentUser)
                                .update({
                                    BasicInfo: {
                                        Height: height,
                                        Weight: weight,
                                        Age: age,
                                        Gender: gender,
                                        Exercise: exercise
                                    },
                                    DailyTarget: target,
                                    dayInfo: {goal: target, total: 0, currentDate: new Date()}
                                });
                            this.setState({
                                Target: target
                            });
                            alert('Data successfully saved!');
                        }
                    }}>
                        <Text>
                            Calculate
                        </Text>
                    </BlueButton>
                </View>

                <View style = {styles.targetInput}>
                    <Text style = {styles.subHeader}>
                        Recommended Daily Target:
                    </Text>
                    <Text style={styles.innerText}>{Target}ml</Text>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {this.updateDailyTarget}
                        value = {Target}
                        keyboardType = 'numeric'
                    />
                    <BlueButton style = {styles.button}
                    onPress = { () => {
                        var currentUser = firebase.auth().currentUser.uid
                        firebase.firestore()
                                .collection('users')
                                .doc(currentUser)
                                .update({DailyTarget: Target,
                                         dayInfo: {goal: Target, total: 0, currentDate: new Date()}})
                        Alert.alert('Daily Target Updated!', 'Please sync Daily Target in the Home page')}}>
                            <Text>Update</Text>
                    </BlueButton>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Math.round(Dimensions.get('window').height),
        width: Math.round(Dimensions.get('window').width),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
        //backgroundColor: 'skyblue'
    },
    input: {
        borderWidth: Dimensions.get('window').height*0.00233,
        borderColor: 'skyblue',
        paddingVertical: Dimensions.get('window').height*0.00233,
        paddingHorizontal: Dimensions.get('window').height*0.0933,
        marginVertical: Dimensions.get('window').height*0.00233,
        borderRadius: Dimensions.get('window').height*0.029,
    },
    targetInput: {
        borderWidth: Dimensions.get('window').height*0.00233,
        borderColor: 'skyblue',
        paddingVertical: Dimensions.get('window').height*0.00583,
        paddingHorizontal: Dimensions.get('window').height*0.0933,
        marginVertical: Dimensions.get('window').height*0.00583,
        borderRadius: Dimensions.get('window').height*0.029,
    },
    textInput: {
        color: 'black',
        fontSize: 16,
        //marginTop: Math.round(Dimensions.get('window').height*0.005),
        height: Math.round(Dimensions.get('window').height*0.04),
        width: Math.round(Dimensions.get('window').width*0.55),
        borderColor: 'skyblue',
        borderBottomWidth: Dimensions.get('window').height*0.00233,
        textAlign: 'center',
    },
    header: {
        color: 'skyblue',
        fontSize: 25,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.005,
        marginBottom: Dimensions.get('window').height*0.005
    },
    subHeader: {
        color: 'skyblue',
        fontSize: 15,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.025
    },
    button: {
        marginHorizontal: Math.round(Dimensions.get('window').width * 0.05),
        paddingBottom: Dimensions.get('window').height*0.00933,
    },
    innerText: {
        fontSize: 25,
        color: 'skyblue',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})