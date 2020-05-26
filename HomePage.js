import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';
import firebaseDb from './firebaseDb.js';

export default class HomePage extends Component {

    render() {
        return (
            <SafeAreaView>
                <Text>Start Drinking!</Text>
            </SafeAreaView>
        )
    }
}