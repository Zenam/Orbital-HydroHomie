import React from 'react';
import { createStackNavigator, HeaderTitle, HeaderBackButton } from '@react-navigation/stack';
import Settings from '../Pages/Settings';
import changeEmail from '../Pages/changeEmail';
import changePassword from '../Pages/changePassword';

const Stack = createStackNavigator();

export default function SettingsStack() {
    return (
        <Stack.Navigator headerMode = 'none'>
            <Stack.Screen name = "Settings" component = {Settings}/>
            <Stack.Screen name = "Change Email" component = {changeEmail}
            /*options = {{
                headerLeft: () => (
                    <Text>hi</Text>)}}*//>
            <Stack.Screen name = "Change Password" component = {changePassword}/>
        </Stack.Navigator>
    )
}