import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';
import firebaseDb from './firebaseDb.js';

export default class SignUp extends Component {
    state = {
        Username: '',
        Password: '',
        signUpSuccessful: false
    }

    handleCreateUser = () => firebaseDb
        .firestore()
        .collection('users')
        .add({
            username: this.state.Username,
            password: this.state.Password
        })
        .then(() =>
            this.setState({
                Username: '',
                Password: '',
                signUpSuccessful: true
            })
        )
        .catch((err) => console.error(err))

    UpdateUsername = (NewUserName) => {
        this.setState({UserName: NewUserName});
    }

    UpdatePassword = (NewPassword) => {
        this.setState({Password: NewPassword});
    }

    render() {
        const {Username, Password, signUpSuccessful} = this.state
        return (
            <View behavior = 'padding' style = {styles.container}>
                <Image source = {{uri: 'https://cdn.clipart.email/4b167aca01293be27c506fbf73b9db37_turbidity-sensors-bikramathens_1600-1600.png'}}
                    style = {styles.logo}/>
                <Text style = {styles.text}>
                    HYDROHOMIE
                </Text>
                <Text style = {styles.subtext}>
                    YOUR WATER DRINKING COMPANION
                </Text>
                <TextInput
                    style = {styles.textInput}
                    placeholder = "Username"
                    onChangeText = {(text) => this.setState({Username:text})}
                    value = {Username}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = "Password"
                    onChangeText = {this.UpdatePassword}
                    value = {Password}
                />
                <View style = {styles.side}>
                    <BlueButton onPress = {() => {
                        if (Username.length > 0 && Password.length > 0) {
                            var usernameIsUnique = true;
                            var database = firebaseDb.database().ref('users');
                            database.orderByChild('username')
                                .equalTo(Username)
                                .on('child_added', (snapshot) => {
                                    if (snapshot.exists()) {
                                        usernameIsUnique = false;
                                    }
                                })

                            if (usernameIsUnique) {
                                this.handleCreateUser();
                            } else {
                                this.setState({
                                    Username: '',
                                    Password: '',
                                    signUpSuccessful: false
                                })
                            }
                        }
                    }}>
                        <Text>
                            Sign Up
                        </Text>
                    </BlueButton>
                
                    <BlueButton onPress = {() => {alert('Welcome')}}>
                        <Text>
                            Login
                        </Text>
                    </BlueButton>
                </View>
                {
                    signUpSuccessful ?
                    (<Text style = {styles.response}>Sign Up Successful!</Text>) : null
                }
                <Image source = 
                    {{uri:'https://library.kissclipart.com/20181122/pgw/kissclipart-water-png-vector-clipart-clip-art-de0aecfaece25fee.png'}}
   style = {styles.waves}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Math.round(Dimensions.get('window').height),
        width: Math.round(Dimensions.get('window').width),
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: Math.round(Dimensions.get('window').height*0.01)
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
    logo: {
        marginTop: Math.round(Dimensions.get('window').height*0.085),
        width: Math.round(Dimensions.get('window').width*0.5),
        height: Math.round(Dimensions.get('window').height*0.25),
        resizeMode: 'contain'
    },
    side: {
        flex: 1,
        flexDirection: 'row',
    },
    response: {
        padding: Math.round(Dimensions.get('window').height*0.02),
        marginTop: Math.round(Dimensions.get('window').height*0.065),
        //marginBottom: 10,
        fontSize: 12,
        color: 'green'
    },
    waves: {
        marginTop: Math.round(Dimensions.get('window').height*0.06),
        width: Dimensions.get('window').width,
        height: Math.round(Dimensions.get('window').height*0.4)
    },
    text: {
        marginTop: 1,
        marginBottom: 1,
        fontSize: 20,
        fontWeight: 'bold',
        width: Math.round(Dimensions.get('window').width),
        textAlign: 'center',
        //fontFamily: 'Optima'
    },
    subtext: {
        marginBottom: 2,
        padding: Math.round(Dimensions.get('window').height*0.015),
        fontSize: 12,
        width: Math.round(Dimensions.get('window').width),
        textAlign: 'center',
        //fontFamily: 'Optima'
    },
})