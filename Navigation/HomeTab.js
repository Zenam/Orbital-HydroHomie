import React, { Component } from 'react';
import Alerts from '../Pages/Alert';
import History from '../Pages/History';
import Settings from '../Pages/Settings';
import profileStack from './profileStack';
import SettingsStack from './SettingsStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../Pages/HomePage';
import { HeaderBackButton } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
      <Tab.Navigator initialRouteName="Home"
      tabBarOptions = {{
        inactiveTintColor:'white',
        activeTintColor: 'steelblue',
        labelStyle: {fontSize: 10, paddingBottom:4},
        tabStyle: {paddingTop:9},
        style:{backgroundColor:'skyblue'}
      }}
      screenOptions = {
          ({ route }) => ({
          tabBarIcon: ({ color, size }) => {
              var iconName; 
              if (route.name === 'Home') {
                iconName = 'ios-home';
              } else if (route.name === 'Alerts') {
                iconName = 'ios-alarm';
              } else if (route.name === 'History') {
                iconName = 'ios-stats';
              } else if (route.name === 'Settings') {
                  iconName = 'ios-settings';
              }
              return(<Ionicons name = {iconName} size={size} color={color}/>)}
            })
      }>
        <Tab.Screen name="Home" component={profileStack}/>
        <Tab.Screen name="Alerts" component={Alerts} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
  );
}