import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RedButton = props => {
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
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 18,
        //width: Math.round(Dimensions.get('window').width * 0.5),
        //height: Math.round(Dimensions.get('window').height * 0.1),
        borderWidth: 1,
        borderRadius: 19,
        borderColor: 'red',
        backgroundColor: 'red',
        paddingHorizontal: 40,
        paddingVertical: 8,
        textAlign: 'center',
        overflow: 'hidden'
    }
})
export default RedButton