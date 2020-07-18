import React, { Component } from 'react';
import { Vibration, Platform, ListItem, StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Expo, { Constants, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import BlueButton from '../Components/BlueButton.js';
import firebase from '../firebaseDb.js';
import TimePicker from 'react-native-simple-time-picker';
import DropDownPicker from 'react-native-dropdown-picker';

export default class Alerts extends Component {
    state = {
        notif: '',
        expoToken: '',
        time: 0
    }

    componentDidMount() {
        this.registerForPushNotificationsAsync();
    }

    registerForPushNotificationsAsync = async () => {
        // check for existing permissions
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        // if no existing permission, ask useer for permission
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        // if no permission, exit function
        if (finalStatus !== 'granted') {
            return;
        }
        // get push notification token
        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({
            expoToken: token
        })
    };

    sendPushNotification = () => {
        // I got the user that we will send the push notification to from the database and set it to state, now I have access to the users push token.
        const userExpoToken = this.state.expoToken
        // Now we will send the message to the expo servers
        let response = fetch('https://exp.host/--/api/v2/push/send', {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
                body:JSON.stringify({
                    to: userExpoToken,
                    sound:'default',
                    title: 'Remember to drink up!',
                    body: this.state.notif
                }
            )
        })
    }

    render() {
        const { notif, expoToken, time } = this.state
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
                    onChangeText = {notif => this.setState({ notif })}
                    value = {notif}
                />
                <Text style = {styles.subHeader}>
                    Select the frequency at which you would like to receive reminders:
                </Text>
                <DropDownPicker
                    items = {[
                        {label: '1', value: 1},
                        {label: '2', value: 2},
                        {label: '3', value: 3},
                        {label: '4', value: 4},
                        {label: '5', value: 5},
                    ]}
                    defaultValue = {this.state.time}
                    containerStyle = {{height: 40}}
                    style = {{backgroundColor: '#fafafa'}}
                    itemStyle = {{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle = {{backgroundColor: '#fafafa'}}
                    onChangeItem = {item => this.setState({
                        time: item.value
                    })}
                />
                <BlueButton onPress = {() => {
                    var currentUser = firebase.auth().currentUser;
                    firebase.firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .update({
                            NotifInfo: {
                                Title: 'Remember to drink up!',
                                Notif: notif,
                                expoToken: expoToken,
                                notifFrequency: time
                            }
                        });
                    setInterval(() => {this.sendPushNotification();}, this.state.time*60*60*1000);
                }}>
                    <Text style = {styles.buttonText}>
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
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    }
})