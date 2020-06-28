import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import BlueButton from '../Components/BlueButton';
import firebase from '../firebaseDb';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false, firstTime: false};
    }

    handleSignIn() {
        this.setState({ error: '', loading: true })
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(error => {alert('Incorrect email or password')
                             this.setState({email: '', password: '', loading: false})})
    }

    onLoginSuccess() {
        const { navigation } = this.props;
        this.setState({
            email: '', password: '', error: '', loading: false
        })
        if (this.state.firstTime) {
            this.setState({firstTime:false})
            navigation.navigate('Home Page', {screen: 'Settings'})
        } else {
            navigation.navigate('Home Page')
        }
    }

    onLoginFailure(errorMessage) {
        this.setState({ error: errorMessage, loading: false })
    }


    render() {
        const {email, password, loading} = this.state;
        const { navigation } = this.props;
        
        return (
            <SafeAreaView style = {styles.container}>
                <Image source = {{uri: 'https://cdn.clipart.email/4b167aca01293be27c506fbf73b9db37_turbidity-sensors-bikramathens_1600-1600.png'}}
                    style = {styles.logo}/>

                <Text style = {styles.text}>
                    HYDROHOMIE
                </Text>

                <Text style = {styles.subtext}>
                    YOUR DRINKING COMPANION
                </Text>
                
                <TextInput label = 'Email'
                    style = {styles.textInput}
                    placeholder = "User@mail.com"
                    onChangeText = {email => this.setState({ email })}
                    value = {email}
                    keyboardType = 'email-address'
                    //inlineImageLeft = {<Ionicons name = 'ios-mail'/>}
                    />

                <TextInput label = 'Password'
                    style = {styles.textInput}
                    placeholder = "Password"
                    onChangeText = {password => this.setState({ password })}
                    value = {password}
                    secureTextEntry = {true}
                />                

                <View style = {styles.side}>

                    <BlueButton onPress = {() => {
                        navigation.navigate('Sign Up')
                    }}>
                        <Text>
                            Sign Up
                        </Text>
                    </BlueButton>


                    <BlueButton onPress = {() => {
                        if(email.length > 0 && password.length > 0) {
                            this.handleSignIn();
                        } else {
                            this.setState({
                                email: '',
                                password: ''
                            });
                            alert('Invalid Email and/or Password')
                        }
                    }}>
                        <Text>
                            Login
                        </Text>
                    </BlueButton>
                </View>

                <Image source = 
                    {{uri:'https://library.kissclipart.com/20181122/pgw/kissclipart-water-png-vector-clipart-clip-art-de0aecfaece25fee.png'}}
   style = {styles.waves}/>

                {loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color= 'skyblue'/>
                </View>}

            </SafeAreaView>
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
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
        backgroundColor:'aliceblue'
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
    /*input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 50
    },*/
    logo: {
        marginTop: Math.round(Dimensions.get('window').height*0.075),
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