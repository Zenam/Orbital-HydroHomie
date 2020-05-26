import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import Login from './Login.js';
import HomePage from './HomePage.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import {decode, encode} from 'base-64'

const Stack = createStackNavigator();

export default function App() {
  if (!global.btoa) { global.btoa = encode }

  if (!global.atob) { global.atob = decode }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions = {{
        headerStyle: {backgroundColor: 'skyblue'},
        headerTintColor: 'white',
        headerTitleStyle: {fontSize: 18}
      }}>
        <Stack.Screen name = "Login" component = {Login} 
        options = {{
          title: 'Login',
        }} />
        <Stack.Screen name="Home Page" component={HomePage}
        options = {{
          title: 'Home',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
