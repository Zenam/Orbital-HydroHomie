import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import BlueButton from './BlueButton.js';
//import firebaseDb from './firebaseDb.js';

export default class SignUp extends Component {
    state = {
        Username: '',
        Password: '',
        signUpSuccessful: false
    }

    /*handleCreateUser = () => firebaseDb
        .firestore()
        .collection('users')
        .add({
            username: this.state.Username,
            password: this.state.Password
        })
        .then(() =>
            this.setState({
                UserName: '',
                Password: '',
                signUpSuccessful: true
            })
        )
        .catch((err) => console.error(err))*/

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
                        /*{
                            signUpSuccessful ?
                            (<Text style = {styles.response}>Sign Up Successful!</Text>) :
                            (<Text style = {styles.response}>Invalid Username or Password</Text>)
                        }*/
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
                    //(<Text style = {styles.response}>Invalid Username or Password</Text>)
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
        marginTop: 80,
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    side: {
        flex: 1,
        flexDirection: 'row',
    },
    response: {
        padding: 20,
        marginTop: 65,
        //marginBottom: 10,
        fontSize: 12,
        color: 'green'
    },
     waves: {
        marginTop: 60,
        width: Dimensions.get('window').width,
        height: 350
     },
     text: {
        marginTop: 1,
        paddingBottom: 20,
        marginBottom: 1,
        fontSize: 20,
        fontWeight: 'bold',
        width: 300,
        textAlign: 'center',
        fontFamily: 'Optima'
     },
     subtext: {
        marginBottom: 2,
        padding: 15,
        fontSize: 12,
        width: 300,
        textAlign: 'center',
        fontFamily: 'Optima'
     },
})