import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../Pages/HomePage';
//import Settings from './Settings.js';
import randomPage from '../Pages/Random';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => alert('bye')}
        />
        <DrawerItem
        label = 'Reset Password'
        onPress = {() => alert('yay')}/>
      </DrawerContentScrollView>
    );
  }

export default function ProfileDrawer() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" component={HomePage}/>
            <Drawer.Screen name= 'Random' component = {randomPage}/>
        </Drawer.Navigator>
    )
}