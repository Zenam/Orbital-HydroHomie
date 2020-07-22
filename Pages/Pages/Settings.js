import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import RedButton from '../Components/RedButton';
import firebase from '../firebaseDb.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

export default class Settings extends Component {
    state = {
        dialogVisible: false,
        pw: '',
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false});
    }
    
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    /*handleDelete = (currentPassword, navigation) => {
        this.setState({isLoading: true})
        this.reauthenticate(currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.delete().then(function() {
              this.setState({dialogVisible: false, isLoading: false});
              navigation.navigate('Login')
          }).catch((error) => { alert(error.message);
                                this.setState({dialogVisible: false, isLoading: false})});
        }).catch((error) => { alert(error.message);
                              this.setState({dialogVisible: false, isLoading: false })});
    }*/

    render() {
        const { dialogVisible, pw } = this.state;
        const { navigation } = this.props;
        return (
            <SafeAreaView style = {styles.container}>

                <TouchableOpacity style = {styles.buttons}
                onPress = {() => navigation.navigate('Change Email')}> 
                    <Ionicons name = 'ios-mail' size = {20} color = 'skyblue'/>
                    <Text style = {styles.email}>Change Email</Text>
                    <Ionicons name = 'ios-arrow-forward' size = {20} color = 'skyblue'/>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttons}
                onPress = {() => navigation.navigate('Change Password')}> 
                    <Ionicons name = 'ios-lock' size = {20} color = 'skyblue'/>
                    <Text style = {styles.password}> Change Password</Text>
                    <Ionicons name = 'ios-arrow-forward' size = {20} color = 'skyblue'/>
                </TouchableOpacity>

                <View style = {styles.redButtons}>
                    <RedButton style = {styles.logout} onPress = { () => {
                        firebase.auth().signOut().then(function() {navigation.navigate('Login')})
                    }}>
                        <Text>  Logout  </Text>
                        <Ionicons name = 'ios-log-out' size = {20} />
                    </RedButton>

                    <RedButton style = {styles.delete}
                    onPress = {() => {this.showDialog()}}>
                        <Text>Delete Account</Text>
                    </RedButton>

                    <Dialog.Container visible={dialogVisible}>
                        <Dialog.Title>Account delete</Dialog.Title>
                        <Dialog.Description>
                            Do you want to delete this account? You cannot undo this action. Please enter password to continue.
                        </Dialog.Description>
                        <Dialog.Input
                            placeholder = 'Password'
                            onChangeText = {input => {this.setState({pw: input})}}
                            value = {pw}
                            secureTextEntry = {true}
                            wrapperStyle = {styles.dialogInput}/>
                        <Dialog.Button label="Cancel" onPress={() => {this.handleCancel()}} />
                        <Dialog.Button label="Delete" color = 'red' 
                            onPress={() => {
                                this.reauthenticate(pw).then(function() {
                                  var user = firebase.auth().currentUser;
                                  firebase.firestore().collection('users').doc(user.uid).delete().then(function() {
                                        var user = firebase.auth().currentUser;
                                        user.delete().then(function() {
                                            navigation.navigate('Login')
                                        }).catch((error) => { alert(error.message);
                                                                this.setState({dialogVisible: false})});
                                    }).catch((error) => { alert(error.message);
                                        this.setState({dialogVisible: false})});
                                }).catch((error) => { alert(error.message);
                                                      this.setState({dialogVisible: false})});
                            }} />
                    </Dialog.Container>

                </View>
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
    buttons: {
        flexDirection: 'row',
        paddingVertical: Dimensions.get('window').height*0.0175,
        marginLeft:  Math.round(Dimensions.get('window').width*0.02)
    },
    email: {
        fontSize: 20,
        marginLeft: Math.round(Dimensions.get('window').width* 0.0355),
        marginRight: Math.round(Dimensions.get('window').width*0.48)
    },
    password: {
        fontSize: 20,
        marginLeft: Math.round(Dimensions.get('window').width* 0.03),
        marginRight: Math.round(Dimensions.get('window').width*0.395),
        alignItems: 'center'
    },
    redButtons: {
        marginTop: Math.round(Dimensions.get('window').height*0.1)
    },
    logout: {
        paddingHorizontal: Dimensions.get('window').height*0.0303,
        paddingVertical: Dimensions.get('window').height*0.00933
    },
    delete: {
        paddingHorizontal: Dimensions.get('window').height*0.02917,
        paddingVertical: Dimensions.get('window').height*0.01167,
        borderRadius: Dimensions.get('window').height*0.0233
    },
    dialogInput: {
        textAlign: 'center'
    }
})