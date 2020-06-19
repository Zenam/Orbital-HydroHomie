import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, SafeAreaView, ActivityIndicator} from 'react-native';
import BlueButton from '../Components/BlueButton';
import firebase from '../firebaseDb.js'

export default class changeEmail extends Component {
    constructor(props){
        super(props)
        this.state = {
            newEmail: '',
            pw: '',
            isLoading: false
        }
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    
    changeEmail = (currentPassword, newEmail) => {
        this.setState({isLoading: true})
        this.reauthenticate(currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updateEmail(newEmail).then(() => {
              this.setState({newEmail: '', pw: '', isLoading: false});
              alert("Email updated!");
          }).catch((error) => { alert(error.message);
                                this.setState({newEmail: '', pw: '', isLoading: false})});
        }).catch((error) => { alert(error.message);
                              this.setState({newEmail: '', pw: '', isLoading: false })});
    }

    render() {
        const {newEmail, pw, isLoading} = this.state
        const {navigation} = this.props
        var user = firebase.auth().currentUser;
        
        return (
            <SafeAreaView style = {styles.container}>
                <TextInput
                style = {styles.textInput}
                onChangeText = {input => {this.setState({newEmail: input})}}
                placeholder = 'New Email'
                value = {newEmail}
                keyboardType = 'email-address'/> 
                <TextInput
                style = {styles.textInput}
                onChangeText = {input => {this.setState({pw: input})}}
                placeholder = 'Current Password'
                value = {pw}
                secureTextEntry  = {true}/>

                <BlueButton style = {styles.buttons}
                onPress = {() => {
                    if (newEmail && pw) {
                        this.changeEmail(pw, newEmail)
                    } else {
                        alert('Please fill up all fields')
                    }}} >
                    Change
                </BlueButton>
                <BlueButton style = {styles.buttons}
                onPress = {() => navigation.goBack()}>
                    Back
                </BlueButton>

                {isLoading &&
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        color: 'black',
        fontSize: 16,
        marginBottom: Math.round(Dimensions.get('window').height*0.015),
        height: Math.round(Dimensions.get('window').height*0.04),
        width: Math.round(Dimensions.get('window').width*0.55),
        borderColor: 'skyblue',
        borderBottomWidth: 2,
        textAlign: 'center',
    },
    buttons: {
        height: Math.round(Dimensions.get('window').height*0.001),
        paddingBottom: Math.round(Dimensions.get('window').height*0.025),
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