import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseDb from './firebaseDb.js';
import Alerts from './Alert.js';
import History from './History.js';
import Settings from './Settings.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input';
import ProgressCircle from 'react-native-progress-circle';

class HomePage extends Component {
    state = {
        drinkAmount: 0,
        toDrink: 2000,
        start: 2000,
        totalDrank: 0
    }

    render() {
        const {drinkAmount, toDrink, totalDrank, start} = this.state
        return (
            <KeyboardAwareScrollView 
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>
                <ImageBackground 
                source = {{uri:'https://images.wallpaperscraft.com/image/under_water_depth_bottom_139714_800x1420.jpg'}}
                imageStyle = {styles.background}
                style = {{width:Dimensions.get('window').width, height: Dimensions.get('window').height}}
                >
                <View style = {styles.target}>
                    <Text style = {styles.header1}>Daily Target:</Text>
                    <Text style = {styles.subheader}> {toDrink} ml</Text>
                    <Text style = {styles.header2}>Amount Drank:</Text>
                    <Text style = {styles.subheader}>{totalDrank} ml</Text>
                </View>
                <View style = {styles.ring}>
                    <ProgressCircle 
                    percent = {((totalDrank/start)*100).toFixed(2)}
                    radius = {140}
                    borderWidth = {15}
                    color = {'skyblue'}
                    shadowColor = {'gainsboro'}
                    //bgColor = {'whitesmoke'}
                    containerStyle = {{paddingLeft: 12}}>
                        <Text style = {styles.ringText}>{((totalDrank/start)*100).toFixed(2)}%</Text>
                        <Text style = {styles.ringText}>COMPLETED</Text>
                    </ProgressCircle>
                </View>
                <View style = {styles.number}>
                    <NumericInput
                    type = 'plus-minus'
                    onChange = {input => this.setState({drinkAmount: input})}
                    step ={50}
                    value = {drinkAmount}
                    minValue = {0}
                    totalHeight = {35}
                    totalWidth = {180}
                    rounded = {true}
                    rightButtonBackgroundColor = 'steelblue'
                    leftButtonBackgroundColor = 'lightsteelblue'
                    borderColor= 'white'
                    iconStyle = {{color:'white'}}
                    />
                </View>
                <View style = {styles.buttons}>
                    <TouchableOpacity style = {styles.drinkButton}
                    onPress = { () => {
                        var left = toDrink - drinkAmount
                        if (left < 0) {
                            this.setState({toDrink: 0, drinkAmount : 0, totalDrank: totalDrank + drinkAmount})
                        } else {
                            this.setState({toDrink: left, drinkAmount : 0, totalDrank: totalDrank + drinkAmount})
                        }
                        console.log(drinkAmount)
                    }}>
                        <Text style = {styles.text}>Drink</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.reset}
                    onPress = {() => {Alert.alert(
                        "Warning",
                        "Confirm restart daily goal?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {this.setState({toDrink: start, totalDrank: 0})}}
                        ],
                        { cancelable: false }
                      )}}>
                        <Ionicons name = {'ios-refresh'} size = {60} color = {'steelblue'}/>
                    </TouchableOpacity>
                </View>
                </ImageBackground> 
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
        inactiveTintColor:'white',
        activeTintColor: 'steelblue',
        labelStyle: {fontSize: 10, paddingBottom:4},
        tabStyle: {paddingTop:9},
        style:{backgroundColor:'skyblue'}
      }}
      screenOptions = {
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              var iconName; 
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home': 'ios-home';
              } else if (route.name === 'Alerts') {
                iconName = focused ? 'ios-alarm' : 'ios-alarm';
              } else if (route.name === 'History') {
                iconName = focused ? 'ios-stats' : 'ios-stats';
              } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-settings' : 'ios-settings';
              }
              return(<Ionicons name = {iconName} size={size} color={color}/>)}
            })
      }>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Alerts" component={Alerts} options = {{title:'Alerts'}}/>
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
    },
    background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.2
    },
    target: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
    },
    header1: {
        marginTop: 120,
        paddingBottom:30,
        fontSize: 25,
        //fontWeight: 'bold',
        color: 'steelblue'
    },
    header2: {
        marginTop: 10,
        fontSize: 25,
        //fontWeight: 'bold',
        color: 'steelblue'
    },
    subheader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 30,
        paddingVertical: 3,
        marginTop: 5,
        backgroundColor: 'skyblue',
        borderRadius: 12,
        overflow: 'hidden'
    },
    number: {
        paddingHorizontal:113
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
    ring: {
        paddingTop: 50,
        paddingBottom: 70,
        paddingHorizontal: 67
    },
    ringText: {
        fontSize: 20,
        color: 'steelblue',
        fontWeight: 'bold',
    },
    buttons: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 35
    },
    reset: {
        marginTop: 10,
        marginLeft: 12
    }
})