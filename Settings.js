import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';

export default class Alerts extends Component {
    state = {
        height: '',
        weight: '',
        age: '',
        gender: ''
    }

    render() {
        const {height, weight, age, gender} = this.state;
        return (
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.header}>
                    To help us calculate the amount of water you should consume, please fill in the following fields.
                </Text>
                <TextInput
                    style = {styles.textInput}
                    placeholder = "Your height in centimetres"
                    onChangeText = {(text) => this.setState({input:text})}
                    value = {height}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = "Your weight in kilograms"
                    onChangeText = {(text) => this.setState({input:text})}
                    value = {weight}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = "Your age in years"
                    onChangeText = {(text) => this.setState({input:text})}
                    value = {age}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = "Your gender"
                    onChangeText = {(text) => this.setState({input:text})}
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
                        } else if (gender !== "male" || gender !== "Male" || gender !== "female" || gender !== "Female") {
                            this.setState({
                                gender: ''
                            })
                            alert('Please enter gender as Male or Female')
                        } else {

                            //code here

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
        Color: 'black',
        fontSize: 30
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
    }
})