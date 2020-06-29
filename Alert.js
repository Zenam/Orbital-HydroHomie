import React, { Component } from 'react';
import { Vibration, Platform, ListItem, StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Expo, { Constants, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import BlueButton from './BlueButton.js';
import firebase from './firebaseDb.js';
import TimePicker from 'react-native-simple-time-picker';

export default class Alerts extends Component {
    state = {
        notif: '',
        startTimeHrs: 0,
        startTimeMins: 0,
        endTimeHrs: 0,
        endTimeMins: 0,
        expoToken: ''
    }

    getExpoToken() {
        let token = Notifications.getExpoPushTokenAsync();
        this.setState({
            expoToken: token
        })
    }

    render() {
        const { notif, startTimeHrs, startTimeMins, endTimeHrs, endTimeMins, expoToken } = this.state
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
                <Text style = {styles.subHeader}>
                    Enter the window you would like to receive notifications from
                </Text>
                <Text style = {styles.subSubHeader}>
                    From:
                </Text>
                <TimePicker
                    startTimeHrs = {startTimeHrs}
                    startTimeMins = {startTimeMins}
                    onChange = {(hours, minutes) => {
                        this.setState({
                            startTimeHrs: hours,
                            startTimeMins: minutes
                        })
                    }}
                />
                <Text style = {styles.subSubHeader}>
                    To:
                </Text>
                <TimePicker
                    endTimeHrs = {endTimeHrs}
                    endTimeMins = {endTimeMins}
                    onChange = {(hours, minutes) => {
                        this.setState({
                            endTimeHrs: hours,
                            endTimeMins: minutes
                        })
                    }}
                />
                <BlueButton onPress = {() => {
                    var currentUser = firebase.auth().currentUser;
                    this.getExpoToken();
                    firebase.firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .update({
                            NotifInfo: {
                                Title: 'Remember to drink up!',
                                Token: expoToken,
                                Notif: notif,
                                startTimeHrs: startTimeHrs,
                                startTimeMins: startTimeMins,
                                endTimeHrs: endTimeHrs,
                                endTimeMins: endTimeMins
                            }
                        });
                }}>
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
    subSubHeader: {
        color: 'black',
        fontSize: 13,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.01,
        marginBottom: Dimensions.get('window').height*0.01
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