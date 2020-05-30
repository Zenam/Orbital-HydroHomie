import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Alerts from './Alert';

const Drawer = createDrawerNavigator();

const ProfileButton = props => {
    return (
        <TouchableOpacity 
        style = {[styles.button, props.style]} 
        onPress = { () => {
            <NavigationContainer>
                <Drawer.Navigator drawerContent ={props => {
                    <DrawerItem label = 'Logout'></DrawerItem>
                }}>
                    <Drawer.Screen name="Alerts" component={Alerts} />
                </Drawer.Navigator>
            </NavigationContainer>
        }}>
            <Ionicons name = 'ios-person' size = {30} color = 'white'/>
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