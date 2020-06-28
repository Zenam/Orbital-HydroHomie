import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import BlueButton from '../Components/BlueButton.js';
import firebase from '../firebaseDb.js';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', confirmPassword: '', error: '', loading: false, firstTime: false};
    }

    handleSignUp() {
        this.setState({ error: '', loading: true })
        const { email, confirmPassword } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, confirmPassword)
            .then(cred => 
                {firebase.firestore().collection('users').doc(cred.user.uid)
                         .set({height: 0})})
            .then(this.setState({firstTime:true}))
            .then(this.onLoginSuccess.bind(this))
            .catch((error) => {
                let errorCode = error.code
                let errorMessage = error.message;
                this.setState({email: '', password: '', confirmPassword: '', loading: false})
                if (errorCode === 'auth/weak-password') {
                    this.onLoginFailure.bind(this)('Weak password!')
                    alert(errorMessage)
                } else if (errorCode === 'auth/email-already-in-use') {
                    alert(errorMessage)
                } else if (error.code === 'auth/invalid-email') {
                    alert(errorMessage);
                } else {
                    this.onLoginFailure.bind(this)(errorMessage)
                }
            });
    }

    onLoginSuccess() {
        const { navigation } = this.props;
        this.setState({
            email: '', password: '', error: '', loading: false
        })
        if (this.state.firstTime) {
            this.setState({firstTime:false})
            navigation.navigate('firstLogin')
        } else {
            navigation.navigate('Home Page')
        }
    }

    onLoginFailure(errorMessage) {
        this.setState({ error: errorMessage, loading: false })
    }

    render() {
        const {email, password, confirmPassword, loading} = this.state;
        return (
            <SafeAreaView style = {styles.container}>
                <TextInput
                    label = 'Email'
                    style = {styles.textInput}
                    placeholder = "User@mail.com"
                    onChangeText = {email => this.setState({ email })}
                    value = {email}
                    keyboardType = 'email-address'/>
                <TextInput
                    label = 'Password'
                    style = {styles.textInput}
                    placeholder = 'Password'
                    onChangeText = {password => this.setState({ password })}
                    value = {password}
                    secureTextEntry = {true}/>
                <TextInput
                    label = 'Confrim Password'
                    style = {styles.textInput}
                    placeholder = 'Confirm Password'
                    onChangeText = {confirmPassword => this.setState({ confirmPassword })}
                    value = {confirmPassword}
                    secureTextEntry = {true}/>
                
                <View style = {styles.buttons}>
                <BlueButton style = {styles.button}
                onPress = {() => {
                    if (email.length > 0 && password.length > 0 && password === confirmPassword) {
                        this.handleSignUp();
                    } else if (password !== confirmPassword) {
                        this.setState({email: '',password: ''})
                        alert('Passwords do not match')
                    } else {
                        this.setState({email: '', password: ''})
                        alert('Invalid Email and/or Password');
                    }
                }}>
                    <Text>
                        Sign Up
                    </Text>
                </BlueButton>
                </View>
                
                {loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color= 'skyblue'/>
                </View>}
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
        //paddingVertical: Math.round(Dimensions.get('window').height*0.01),
        backgroundColor:'aliceblue'
    },
    textInput: {
        color: 'black',
        marginTop: Math.round(Dimensions.get('window').height*0.015),
        height: Math.round(Dimensions.get('window').height*0.04),
        width: Math.round(Dimensions.get('window').width*0.55),
        borderColor: 'skyblue',
        borderBottomWidth: 2,
        borderRadius: 8,
        textAlign: 'center'
    },
    buttons: {
        paddingTop: 35
    },
    button:{
        paddingBottom: 10
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 260,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }
})