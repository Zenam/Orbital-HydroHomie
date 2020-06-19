import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BlueButton = props => {
    return (
    <TouchableOpacity 
        style = {[styles.button, props.style]} 
        onPress = {props.onPress}>
        <Text style = {[styles.text, props.style]}>
             {props.children}
        </Text>   
   </TouchableOpacity> 
   )
}


const styles = StyleSheet.create( {
    button: {
        padding: 20
    },
    text: {
        color: 'white',
        fontSize: 12,
        width: 100,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'steelblue',
        backgroundColor: 'skyblue',
        paddingTop: 8,
        paddingBottom: 21,
        textAlign: 'center',
        overflow: 'hidden'
    }
})
export default BlueButton