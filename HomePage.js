import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseDb from './firebaseDb.js';
import Alerts from './Alert.js'
import History from './History.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input';

class HomePage extends Component {
    state = {
        amount: 0,
        toDrink: 2000,
        start: 2000
    }

    render() {
        const {amount, toDrink, start} = this.state
        return (
            <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>
                <View style = {styles.target}>
                    <Text style = {styles.header}>Amount to Drink:</Text>
                    <Text style = {styles.subheader}> {toDrink} </Text>
                </View>
                <NumericInput
                type = 'plus-minus'
                onChange = {input => this.setState({amount: input})}
                step ={10}
                value = {amount}
                minValue = {0}
                maxValue = {toDrink}
                totalHeight = {35}
                totalWidth = {180}
                rounded = {true}
                rightButtonBackgroundColor = 'steelblue'
                leftButtonBackgroundColor = 'lightsteelblue'
                iconStyle = {{color:'white'}}
                />
                <View style = {styles.buttons}>
                    <TouchableOpacity style = {styles.drinkButton}
                    onPress = { () => {
                        this.setState({toDrink: toDrink - amount, amount : 0})
                        console.log(amount)
                    }}>
                        <Text style = {styles.text}>Drink</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.reset}
                    onPress = {() => {this.setState({toDrink: start})}}>
                        <Ionicons name = {'ios-refresh'} size = {60} color = {'skyblue'}/>
                    </TouchableOpacity>
                </View> 
            </KeyboardAwareScrollView>
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
        inactiveTintColor:'white',
        activeTintColor: 'steelblue',
        labelStyle: {fontSize: 10, paddingBottom:4},
        tabStyle: {paddingTop:9},
        style:{backgroundColor:'skyblue'}
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
              }
              return(<Ionicons name = {iconName} size={size} color={color}/>)}
            })
      }>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Alerts" component={Alerts} options = {{title:'Alerts'}}/>
        <Tab.Screen name="History" component={History} />
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
    target: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 500
    },
    header: {
        marginTop: 70,
        paddingBottom:30,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'steelblue'
    },
    subheader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 30,
        paddingVertical: 3,
        marginTop: 15,
        backgroundColor: 'steelblue',
        borderRadius: 12,
        overflow: 'hidden'
    },
    drinkButton: {
        padding: 17,
    },
    text: {
        color: 'white',
        fontSize: 25,
        borderRadius: 25,
        backgroundColor: 'skyblue',
        overflow: 'hidden',
        paddingHorizontal: 65,
        paddingVertical: 10,
        marginBottom: 30,
        marginLeft: 58
    },
    buttons: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    reset: {
        marginTop: 10,
        marginLeft: 12
    }
})