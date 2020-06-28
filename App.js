import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import Login from './Pages/Login';
import HomeTabs from './Navigation/HomeTab'
import firstLogin from './Pages/firstLogin'
import ProfileButton from './Components/profileButton'
import DoneButton from './Components/doneButton'
import SignUp from './Pages/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle, HeaderBackButton } from '@react-navigation/stack';
import {decode, encode} from 'base-64';
import firebase from './firebaseDb.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
/*import { Provider } from 'react-redux';
import {myStore, persistor} from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'*/


const Stack = createStackNavigator();

//const store = createStore(allReducers);

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'Home':
      return 'Hydro Homie'
    case 'Alerts':
      return 'Alerts'
    case 'History':
      return 'History'
    case 'Settings':
      return 'Settings'
    case 'Profile':
      return 'Profile'
  }
}

export default function App() {
  if (!global.btoa) { global.btoa = encode }

  if (!global.atob) { global.atob = decode }

  var user = firebase.auth().currentUser;

  //const {navigation} = this.props;

  return(
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
          <Stack.Screen name = "Sign Up" component = {SignUp} 
          options = {{
            title: 'Sign Up',
          }} />
          <Stack.Screen name="Home Page" component={HomeTabs}
          options = {({ route, navigation}) => ({
              headerTitle: getHeaderTitle(route),
              headerRight: () => (
                <ProfileButton onPress = {() => navigation.navigate('Profile')}/>
              ),
              headerLeft: null,
              gestureEnabled: false
              })}/>
          <Stack.Screen name="firstLogin" component={firstLogin}
            options = {({navigation}) => ({
            title: 'Profile',
            headerLeft: null,
            gestureEnabled: false
            /*headerRight: () => (
              <DoneButton onPress = {() => navigation.navigate('Home Page')}/>
            ),*/
            })}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
