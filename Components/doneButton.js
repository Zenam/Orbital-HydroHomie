import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DoneButton = props => {
    return (
        <TouchableOpacity 
        style = {[styles.button, props.style]}
        onPress = {props.onPress}>
            <Text style = {styles.text}>Done</Text>
            <Ionicons name = 'md-arrow-round-forward' size = {62} color = 'skyblue'/>
        </TouchableOpacity> 
    )
}

export default DoneButton

const styles = StyleSheet.create( {
    button: {
        flex: 1,
        flexDirection: 'row',
        /*paddingHorizontal: Math.round(Dimensions.get('window').height*0.03),
        paddingBottom: -Math.round(Dimensions.get('window').width*0.05),
        paddingTop: 3.5,
        backgroundColor: 'skyblue',
        borderWidth: 1,
        borderColor: 'skyblue',
        overflow: 'hidden',
        borderRadius: 10,
        textAlign: 'center'*/
    },
    text: {
        color: 'skyblue',
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: Math.round(Dimensions.get('window').height * 0.015),
        marginRight: Math.round(Dimensions.get('window').width * 0.02)
    }
})