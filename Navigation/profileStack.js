import React from 'react';
import { createStackNavigator, HeaderTitle, HeaderBackButton } from '@react-navigation/stack';
import HomePage from '../Pages/HomePage';
import Profile from '../Pages/Profile'

const Stack = createStackNavigator();

export default function profileStack() {
    return (
        <Stack.Navigator headerMode = 'none'>
            <Stack.Screen name = "Home" component = {HomePage}/>
            <Stack.Screen name = "Profile" component = {Profile}/>
        </Stack.Navigator>
    )
}