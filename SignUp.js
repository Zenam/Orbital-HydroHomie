import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import BlueButton from './BlueButton.js';

export default class SignUp extends Component {
    state = {
        Username: '',
        Password: '',
        signUpSuccessful: false
    }

    UpdateUsername = (NewUserName) => {
        this.setState({UserName: NewUserName});
    }

    UpdatePassword = (NewPassword) => {
        this.setState({Password: NewPassword});
    }

    render() {
        const {Username, Password, signUpSuccessful} = this.state
        return (
            <KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
                <Image source = {{uri: 'https://cdn.clipart.email/4b167aca01293be27c506fbf73b9db37_turbidity-sensors-bikramathens_1600-1600.png'}}
   style = {styles.logo}/>
                <Text style = {styles.text}>
                    HydroHomie
                </Text>
                <Text style = {styles.subtext}>
                    Your water drinking companion
                </Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Username"
                onChangeText = {this.UpdateUsername}
                //maxLength = {20}
                value = {Username}
                />
                <TextInput
                style = {styles.textInput}
                placeholder = "Password"
                onChangeText = {this.UpdatePassword}
                maxLength = {20}
                value = {Password}
                />
                <View style = {styles.side}>
                    <BlueButton  
                    onPress = {() => {
                        if (Username.length && Password.length) {
                            this.setState({
                                Username: '',
                                Password: '',
                                signUpSuccessful: true
                            })
                        } else {
                            this.setState({
                                Username: '',
                                Password: '',
                                signUpSuccessful: false
                            })
                        }
                    }}>
                        Sign Up
                    </BlueButton>
                
                    <BlueButton 
                    onPress = {() => {alert('Welcome')}}>
                        Login
                    </BlueButton>
                </View>
                {
                    signUpSuccessful ? 
                    (<Text style = {styles.response}>Sign Up Successful!</Text>) : 
                    (<Text style = {styles.response}>Invalid Username or Password</Text>)
                }
                <Image source = 
                {{uri:'https://library.kissclipart.com/20181122/pgw/kissclipart-water-png-vector-clipart-clip-art-de0aecfaece25fee.png'}}
   style = {styles.waves}/>
                
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'column',
    },
    textInput: {
        color: 'black',
        marginTop: 15,
       height: 40,
       width: 250,
       borderColor: 'skyblue',
       borderWidth: 1,
       borderRadius: 8,
       textAlign: 'center'
    },
    logo: {
        marginTop: 120,
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    side: {
        flex: 1,
        flexDirection: 'row',
    },
    response: {
        marginTop: 10,
        fontSize: 12,
        color: 'green'
    },
     waves: {
        marginTop: 80,
        width: Dimensions.get('window').width,
        height: 400
     },
     text: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',
        //fontFamily: 'monospace'
     },
     subtext: {
        marginBottom: 20,
        fontSize: 15,
        width: 300,
        textAlign: 'center',
        //fontFamily: 'monospace'
     },
})