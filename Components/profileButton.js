import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProfileButton = props => {
    return (
        <TouchableOpacity 
        style = {[styles.button, props.style]}
        onPress = {props.onPress}>
            <Ionicons name = 'ios-contact' size = {30} color = 'white'/>
        </TouchableOpacity> 
    )
}

export default ProfileButton

const styles = StyleSheet.create( {
    button: {
        paddingRight: 25,
        paddingTop: 5
    }
})