import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';
import firebase from './firebaseDb.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: ''};
    }

    onButtonPress() {
        this.setState({ error: '', loading: true })
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch((error) => {
                        let errorCode = error.code
                        let errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                            this.onLoginFailure.bind(this)('Weak password!')
                        } else {
                            this.onLoginFailure.bind(this)(errorMessage)
                        }
                    });
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '', password: '', error: '', loading: false
        })
    }

    onLoginFailure(errorMessage) {
        this.setState({ error: errorMessage, loading: false })
    }

/*
    UpdatePassword = (NewPassword) => {
        this.setState({Password: NewPassword});
    }

    handleCreateUser = () => firebase
        .firestore()
        .collection('users')
        .add({
            username: this.state.Username,
            password: this.state.Password,
            data: {
                height: '',
                weight: '',
                age: '',
                gender: ''
            }
        })
        .then(() =>
            this.setState({
                Username: '',
                Password: '',
            })
        )
        .catch((err) => console.error(err))
*/
    render() {
        // const {Username, Password} = this.state;
        // const { navigation } = this.props;
        return (
            <SafeAreaView style = {styles.container}>

                <Image source = {{uri: 'https://cdn.clipart.email/4b167aca01293be27c506fbf73b9db37_turbidity-sensors-bikramathens_1600-1600.png'}}
                    style = {styles.logo}/>

                <Text style = {styles.text}>
                    'HYDROHOMIE'
                </Text>

                <Text style = {styles.subtext}>
                    'YOUR DRINKING COMPANION'
                </Text>

                <TextInput label = 'Email'
                    style = {styles.textInput}
                    placeholder = "user@mail.com"
                    onChangeText = {email => this.setState({ email })}
                    value = {this.state.email}
                />

                <TextInput label = 'Password'
                    style = {styles.textInput}
                    placeholder = "password"
                    onChangeText = {password => this.setState({ password })}
                    value = {this.state.password}
                    secureTextEntry = {true}
                />

                <View style = {styles.side}>

                    <BlueButton onPress = {() => {
                        if (Username.length > 0 && Password.length > 0) {
                            this.onButtonPress();
                            /*
                            firebase.firestore()
                                .collection('users')
                                .where('username', '==', Username)
                                .get()
                                .then(snapshot => {
                                    var users = [];
                                    snapshot.forEach(doc => {
                                        users.push(doc.data());
                                    })
                                    console.log(users)
                                    if (users.length) {
                                        this.setState({
                                            Username: '',
                                            Password: '',
                                        })
                                        alert('Username already exists')
                                    } else {
                                        this.handleCreateUser();
                                        alert('Sign Up Successful! Please login.')
                                    }
                                })
                            */
                        } else {
                            this.setState({
                                email: '',
                                password: ''
                            });
                            alert('Invalid Username or Password');
                        }
                    }}>

                        <Text>
                            'Sign Up/Login'
                        </Text>

                    </BlueButton>

/*
                    <BlueButton onPress = {() => {
                        firebase.firestore()
                            .collection('users')
                            .where('username', '==', Username)
                            .where('password', '==', Password)
                            .get()
                            .then( snapshot => {
                                var users = [];
                                snapshot.forEach(doc => {
                                    users.push(doc.data());
                                })
                                console.log(users)
                                if (users.length) {
                                    this.setState({
                                        Username: '',
                                        Password: '',
                                    })
                                    navigation.navigate('Home Page')
                                } else {
                                    this.setState({
                                        Username: '',
                                        Password: '',
                                    })
                                    alert('Incorrect Username or Password')
                                }
                            })
                            .catch(err => console.error(err))
                    }} >
                        <Text>
                            Login
                        </Text>
                    </BlueButton>
*/
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
})