import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';

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
                <View style = {styles.orangeRectangle}/>
                <View style = {styles.blueRectangle}/>
                <Image source = {{uri: 'http://www.nus.edu.sg/images/default-source/base/logo.png'}}
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
                
                <TouchableOpacity 
                style = {styles.button} 
                onPress = {() => {alert('Enter')}}>
                    <Text style = {styles.text}>
                        Login
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style = {styles.button} 
                onPress = {() => {alert('Welcome')}}>
                    <Text style = {styles.text}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
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
        //backgroundColor: 'orange'
        //justifyContent: 'center'
    },
    textInput: {
       margin: 15,
       height: 40,
       width: 250,
       borderColor: 'orange',
       borderWidth: 1,
       borderRadius: 5,
       textAlign: 'center'
    },
    logo: {
        paddingTop: 20,
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    blueRectangle: {
        width: Dimensions.get('window').width,
        height: 30,
        backgroundColor: 'midnightblue'
    },
    orangeRectangle: {
        width: Dimensions.get('window').width,
        height: 15,
        backgroundColor: 'orange'
    },
    button: {
        //marginTop: 60,
        padding: 20
    },
    text: {
        color: 'white',
        fontSize: 12,
        width: 100,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        backgroundColor: 'midnightblue',
        padding: 15,
        textAlign: 'center',
        overflow: 'hidden'
     }
})