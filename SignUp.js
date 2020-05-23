import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import BlueButton from './BlueButton.js';

export default class SignUp extends Component {
    state = {
        Username: '',
        Password: ''
    }

    UpdateUsername = (NewUserName) => {
        this.setState({UserName: NewUserName});
    }

    UpdatePassword = (NewPassword) => {
        this.setState({Password: NewPassword});
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <Image source = {{uri: 'https://cdn.clipart.email/4b167aca01293be27c506fbf73b9db37_turbidity-sensors-bikramathens_1600-1600.png'}}
   style = {styles.logo}/>
                <TextInput
                style = {styles.textInput}
                placeholder = "Username"
                onChangeText = {this.UpdateUsername}
                //value = {this.state.Username}
                />
                <TextInput
                style = {styles.textInput}
                placeholder = "Password"
                onChangeText = {this.UpdatePassword}
                //value = {this.state.Password}
                />
                <View style = {styles.side}>
                    <BlueButton  
                    onPress = {() => {alert('Enter')}}>
                        Login
                    </BlueButton>
                
                    <BlueButton 
                    onPress = {() => {alert('Welcome')}}>
                        Sign Up
                    </BlueButton>
                </View>
                <Image source = 
                {{uri:'https://library.kissclipart.com/20181122/pgw/kissclipart-water-png-vector-clipart-clip-art-de0aecfaece25fee.png'}}
   style = {styles.waves}/>
                
            </SafeAreaView>
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
       padding: 20,
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
     waves: {
        marginTop: 80,
        width: Dimensions.get('window').width,
        height: 400
        //resizeMode: 'contain'
     }
})