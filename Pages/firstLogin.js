import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from '../Components/BlueButton';
import firebase from '../firebaseDb.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import DoneButton from '../Components/doneButton'

export default class Profile extends Component {
    state = {
        height: 0,
        weight: 0,
        age: 0,
        gender: 'Male',
        exercise: 0,
        allFilledUp: false,
        Target: 0
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
        const {height, weight, age, gender, exercise, Target, allFilledUp} = this.state;
        const {navigation} = this.props;
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
                    containerStyle = {{marginVertical: 15}}
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
                            var target = Math.ceil(((((weight * age)/28.3 * 29.5735)) + (exercise/15)*177.5)/100) * 100;
                            firebase.firestore()
                                .collection('users')
                                .doc(currentUser)
                                .set({
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
                                Target: target,
                                allFilledUp: true
                            });
                            alert('Data successfully saved!');
                        }
                    }}>
                        <Text>
                            Calculate
                        </Text>
                    </BlueButton>
                </View>
                
                <Text style = {styles.ps}>*Daily Target can be changed under profile later</Text>

                <View style = {styles.result}>
                    <Text style = {styles.resultHeader}>
                        Recommended Daily Target:
                    </Text>
                    <Text style = {styles.goal}>  {Target} ml</Text>
                </View>
                <DoneButton style = {styles.next} onPress = {() => {
                    if (allFilledUp) {
                        navigation.navigate('Home Page')
                    } else {
                        alert("Please fill up all fields and press 'Calculate'")
                    }}}/>
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
    },
    input: {
        borderWidth: 2,
        borderColor: 'skyblue',
        paddingVertical: 5,
        paddingHorizontal: 80,
        marginTop: Math.round(Dimensions.get('window').height*0.001),
        marginBottom: Math.round(Dimensions.get('window').height*0.02),
        borderRadius: 25,
    },
    textInput: {
        color: 'black',
        fontSize: 16,
        marginTop: Math.round(Dimensions.get('window').height*0.001),
        height: Math.round(Dimensions.get('window').height*0.04),
        width: Math.round(Dimensions.get('window').width*0.55),
        borderColor: 'skyblue',
        borderBottomWidth: 2,
        textAlign: 'center',
    },
    header: {
        color: 'skyblue',
        fontSize: 25,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.01,
        marginBottom: Dimensions.get('window').height*0.02
    },
    subHeader: {
        color: 'skyblue',
        fontSize: 15,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.025
    },
    button: {
        marginHorizontal: Math.round(Dimensions.get('window').width * 0.05),
        paddingBottom: 8,
        marginTop: Math.round(Dimensions.get('window').height * 0.005)
    },
    ps: {
        marginTop: -Math.round(Dimensions.get('window').height * 0.015),
        fontSize: 10,
        marginLeft: -Math.round(Dimensions.get('window').width * 0.35)
    },
    result: {
        textAlign: 'center',
    },
    resultHeader: {
        color: 'skyblue',
        fontSize: 25,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.035
    },
    goal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        //paddingHorizontal: Math.round(Dimensions.get('window').width * 0.1),
        paddingVertical: Math.round(Dimensions.get('window').height * 0.01),
        marginTop: Math.round(Dimensions.get('window').height * 0.01),
        marginBottom: Math.round(Dimensions.get('window').height*0.02),
        backgroundColor: 'skyblue',
        borderRadius: 12,
        overflow: 'hidden',
        textAlign: 'center',
    },
    next:{
        paddingTop: Math.round(Dimensions.get('window').height * 0.02),
        marginLeft: Math.round(Dimensions.get('window').width * 0.6)
    }
})