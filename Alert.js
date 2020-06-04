import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';
import firebase from './firebaseDb.js';

export default class Alerts extends Component {
    state = {
        notif: '',
        startTime: 0,
        endTime: 0
    }
    updateNotif = (newNotif) => {
        this.setState({notif: newNotif});
    }
    render() {
        const {notif, startTime, endTime} = this.state;
        return (
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.header}>
                    Customise your notifications to maximise your motivation!
                </Text>
                <Text style = {styles.subHeader}>
                    Your custom notification.
                </Text>
                <TextInput
                    style = {styles.textInput}
                    onChangeText = {this.updateNotif}
                    value = {notif}
                />
                <BlueButton onPress = {() => {
                    var currentUser = firebase.auth().currentUser.uid;
                    firebase.firestore()
                        .collection('users')
                        .doc(currentUser)
                        .update({
                            NotifInfo: {
                                Notif: notif
                            }
                        });
                }
                }>
                    <Text>
                        Save
                    </Text>
                </BlueButton>
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
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
        //backgroundColor: 'skyblue'
    },
    header: {
        marginTop: 1,
        marginBottom: 1,
        fontSize: 20,
        fontWeight: 'bold',
        width: Math.round(Dimensions.get('window').width),
        textAlign: 'center',
        //fontFamily: 'Optima'
    },
    subHeader: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.015
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
    }
})