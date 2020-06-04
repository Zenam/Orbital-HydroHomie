import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';
import firebase from './firebaseDb.js'

export default class Settings extends Component {
    state = {
        height: 0,
        weight: 0,
        age: 0,
        gender: ''
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

    render() {
        const {height, weight, age, gender} = this.state;
        return (
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.header}>
                    To help us calculate the amount of water you should consume, please fill in the following fields.
                </Text>
                <Text style = {styles.subHeader}>
                    Your height in centimetres.
                </Text>
                <TextInput
                    style = {styles.textInput}
                    onChangeText = {this.updateHeight}
                    value = {height}
                />
                <Text style = {styles.subHeader}>
                    Your weight in kilograms.
                </Text>
                <TextInput
                    style = {styles.textInput}
                    onChangeText = {this.updateWeight}
                    value = {weight}
                />
                <Text style = {styles.subHeader}>
                    Your age in years.
                </Text>
                <TextInput
                    style = {styles.textInput}
                    onChangeText = {this.updateAge}
                    value = {age}
                />
                <Text style = {styles.subHeader}>
                    Your gender.
                </Text>
                <TextInput
                    style = {styles.textInput}
                    onChangeText = {this.updateGender}
                    value = {gender}
                />
                <View style = {styles.buttons}>
                    <BlueButton onPress = {() => {
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
                        } else if ( !(gender == "male" || gender == "Male" || gender == "female" || gender == "Female") ) {
                            this.setState({
                                gender: ''
                            })
                            alert('Please enter gender as Male or Female')
                        } else {
                            var currentUser = firebase.auth().currentUser.uid;
                            var target = weight * age / 28.3 * 29.5735;
                            firebase.firestore()
                                .collection('users')
                                .doc(currentUser)
                                .set({
                                    BasicInfo: {
                                        Height: height,
                                        Weight: weight,
                                        Age: age,
                                        Gender: gender
                                    },
                                    DailyTarget: target
                                });
                            this.setState({
                                height: '',
                                weight: '',
                                age: '',
                                gender: ''
                            });
                            alert('Data successfully saved!');
                        }
                    }
                    }>
                        <Text>
                            Save
                        </Text>
                    </BlueButton>
                </View>
            </SafeAreaView>
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
    textInput: {
        color: 'black',
        marginTop: Math.round(Dimensions.get('window').height*0.015),
        height: Math.round(Dimensions.get('window').height*0.04),
        width: Math.round(Dimensions.get('window').width*0.55),
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center'
    },
    header: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    },
    subHeader: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.015
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
    }
})