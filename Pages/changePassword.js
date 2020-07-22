import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, SafeAreaView, ActivityIndicator} from 'react-native';
import BlueButton from '../Components/BlueButton';
import firebase from '../firebaseDb.js'

export default class changePassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentPw: '',
            newPw: '',
            cfmPw: '',
            isLoading: false
        }
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }

    changePassword = (currentPassword, newPassword) => {
        this.setState({isLoading: true})
        this.reauthenticate(currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(newPassword).then(() => {
              this.setState({currentPw: '', newPw: '', cfmPw:'', isLoading: false});
              alert("Password updated!");
          }).catch((error) => { alert(error.message);
                                this.setState({newEmail: '', pw: '', isLoading: false})});
        }).catch((error) => { alert(error.message);
            this.setState({newEmail: '', pw: '', isLoading: false})});
    }

    render() {
        const {currentPw, newPw, cfmPw, isLoading} = this.state
        const {navigation} = this.props
        return (
            <SafeAreaView style = {styles.container}>

                <TextInput
                style = {styles.textInput}
                onChangeText = {input => {this.setState({currentPw: input})}}
                value = {currentPw}
                placeholder = 'Current Password'
                secureTextEntry= {true}/> 

                <TextInput
                style = {styles.textInput}
                onChangeText = {input => {this.setState({newPw: input})}}
                value = {newPw}
                placeholder = 'New Password'
                secureTextEntry= {true}/> 

                <TextInput
                style = {styles.textInput}
                onChangeText = {input => {this.setState({cfmPw: input})}}
                value = {cfmPw}
                placeholder = 'Confirm New Password'
                secureTextEntry= {true}/> 

                <BlueButton style = {styles.buttons}
                onPress = {() => {
                    if (currentPw && newPw && cfmPw) {
                        this.changePassword(currentPw, cfmPw)
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
        //paddingVertical: Math.round(Dimensions.get('window').height*0.01),
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
        top: Dimensions.get('window').height*0.3675,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }
})