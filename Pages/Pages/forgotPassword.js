import React, { Component } from 'react';
import firebase from '../firebaseDb';
import { SafeAreaView, StyleSheet, Text, Dimensions} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BlueButton from '../Components/BlueButton';

export default class forgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    render() {
        const {email} = this.state;
        return (
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.header}>Enter your email address and reset your email with the link provided</Text>
                <TextInput label = 'Email'
                    style = {styles.textInput}
                    placeholder = "User@mail.com"
                    onChangeText = {email => this.setState({ email })}
                    value = {email}
                    keyboardType = 'email-address'
                />
                <BlueButton 
                style = {styles.button}
                onPress = {() => {
                    if (email.length <= 0) {
                        alert('Please input email address')
                    }else {
                        var auth = firebase.auth();
                        var emailAddress = email;
                        auth.sendPasswordResetEmail(emailAddress).then(function() {
                            alert('Link sent to email address')
                            //this.setState({email:''})
                        }).catch(function(error) {
                            alert(error.message)
                        });
                    }
                }}>
                    <Text>Send</Text>
                </BlueButton>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'aliceblue'
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: Math.round(Dimensions.get('window').width*0.02),
        paddingVertical: Math.round(Dimensions.get('window').height*0.03)
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
    button: {
        height: Math.round(Dimensions.get('window').height*0.03),
        paddingVertical: Math.round(Dimensions.get('window').height*0.03),
    },
})