import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BlueButton from './BlueButton.js';
import firebaseDb from './firebaseDb.js';
import Alerts from './Alert.js'
import History from './History.js'
import Settings from './Settings.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomePage extends Component {

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.text}>BO TAH BO LANPA</Text>
            </SafeAreaView>
        )
    }
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent = {true}> 
      <Tab.Navigator initialRouteName="Home"
      tabBarOptions = {{
        //activeBackgroundColor: 'grey',
        //inactiveBackgroundColor: 'lightcyan',
        activeTintColor: 'lightsteelblue',
        labelStyle: {fontSize: 10, paddingBottom: 4},
        tabStyle: {paddingTop: 9}
        //safeAreaInsets: 'right'
      }}
      screenOptions = {
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              var iconName; 
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'Alerts') {
                iconName = focused ? 'ios-alarm' : 'ios-alarm';
              }
              else if (route.name === 'History') {
                iconName = focused ? 'ios-stats' : 'ios-stats';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings-outline' : 'settings-outline';
              }
              return(<Ionicons name = {iconName} size={size} color={color}/>)}
            })
      }>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Alerts" component={Alerts} options = {{title:'Alerts'}}/>
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name = "Settings" component = {Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        height: Math.round(Dimensions.get('window').height),
        width: Math.round(Dimensions.get('window').width),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
        //backgroundColor: 'skyblue'
    },
    text: {
        fontSize: 30
    }
})