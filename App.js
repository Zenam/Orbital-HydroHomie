import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import Login from './Login.js';
import HomePage from './HomePage.js'
import Settings from './Settings.js'
import ProfileButton from './profileButton.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle, HeaderBackButton } from '@react-navigation/stack';
import {decode, encode} from 'base-64'

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home Page'

  switch (routeName) {
    case 'Home Page':
      return 'Home'
    case 'Alerts':
      return 'Alerts'
    case 'History':
      return 'History'
    case 'Settings':
      return 'Settings'
  }
}

export default function App() {
  if (!global.btoa) { global.btoa = encode }

  if (!global.atob) { global.atob = decode }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions = {{
        headerStyle: {backgroundColor: 'skyblue'},
        headerTintColor: 'white',
        headerTitleStyle: {fontSize: 18},
      }}>
        <Stack.Screen name = "Login" component = {Login} 
        options = {{
          title: 'Login',
        }} />
        <Stack.Screen name="Home Page" component={HomePage}
        options = {({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => (<ProfileButton />)
          })
        } />
        <Stack.Screen name="Settings" component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
