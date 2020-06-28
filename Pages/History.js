import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import {LineChart, BarChart, DotContent} from "react-native-chart-kit";
//import { BarChart, Grid } from 'react-native-svg-charts'
import firebase from '../firebaseDb.js'
import { FlatList } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';

export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /*year: '',
            month: '',
            minDate: 0,
            maxDate: 0,*/
            dataPoints: [0],
            label: [0],
            list: [0],
        }
    }

    getDataPoints = () => {
        var user = firebase.auth().currentUser
        var dbRef = firebase.firestore().collection('users').doc(user.uid).collection('History')
        //var firstMonth = new Date().getMonth() + 1
        /*var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ]*/
        this.setState({dataPoints: [0], label: [0], list: [0]})
        //for (x = 0; x < num; x+1) {
            //var currMonth = firstMonth - x
        dbRef/*.where('year', '==', year)
                .where('month', '==', month)*/
                .orderBy('date', 'asc')
                .limit(7)
                .get()
                .then(snapShot => {
                    var myData = [0, 0, 0, 0, 0, 0, 0];
                    var myDates = this.getPast7Days();
                    //console.log(myDates)
                    var myLabel = []
                    var myList = []
                    for (var i = 0; i < myDates.length; i++) {
                        //console.log(typeof myDates[i])
                        myLabel.push(myDates[i].getDate()+'/'+(myDates[i].getMonth()+1));
                        var obj = {};
                        obj['date'] = myDates[i].getDate()+'/'+(myDates[i].getMonth()+1)+'/'+myDates[i].getFullYear();
                        obj['drank'] = 0;
                        myList.push(obj)
                    }
                    //console.log(typeof myList[0]['date'])
                    if (snapShot.empty) {
                        //total = 0
                        //this.setState({dataPoints:[0], label: [months[month - 1]]})
                    } else {
                        snapShot.forEach(doc => {
                            var x = doc.data().date.toDate()
                            //var counter = 0
                            for (var d = 0; d < 7; d++) {
                                if (this.compareDate(x, myDates[d])) {
                                    myData[d] = doc.data().drank;
                                    myList[d]['drank'] = doc.data().drank
                                }
                            }
                                /*myData.push(doc.data().drank);
                                myLabel.push(doc.data().day+'/'+doc.data().month)
                                myList.push(doc.data())*/
                        })
                    }
                    //this.state.dataPoints.push(total)
                    //this.state.label.push(months[firstMonth - 1])
                    this.setState({dataPoints: myData, label: myLabel, list: myList})
                    //console.log(this.state.list[0]['date'].getDate())
                }).catch(error => console.log(error))
        //}
    }

    compareDate = (d1,d2) => {
        if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() == d2.getDate()) {
            return true
        } else {
            return false
        }
    }

    getPast7Days = () => {
        var result = [];
        for (var i=1; i<=7; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push(d)
        }
        return result.reverse();
    }
    
    componentDidMount() {
        /*var mon = new Date().getMonth() + 1
        var yr = new Date().getFullYear()
        var date = new Date().getDate()*/
        this.getDataPoints()
    }

    render() {
        
        const {dataPoints, label, list} = this.state;

        const graphData = {
            labels: label,
            datasets: [
              {
                data: dataPoints,
                //color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            //legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
        };
        const chartConfig = {
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            backgroundGradientFromOpacity: 0.5,
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            fillShadowGradient: 'rgba(255, 255, 255)',
            fillShadowGradientOpacity: 1,
            strokeWidth: 2, 
        };
        const screenWidth = Dimensions.get("window").width;
        
        return (
            <SafeAreaView style = {styles.container}>               
                <View style = {{backgroundColor: 'skyblue'}}>
                <LineChart
                    style = {styles.graph}
                    data={graphData}
                    width={screenWidth}
                    height={Dimensions.get("window").height*0.35}
                    chartConfig={chartConfig}
                    fromZero = {true}
                    //verticalLabelRotation = {}
                    yAxisInterval = {10}
                    //bezier
                    //onDataPointClick ={() => this.setState({dataPoint: 5})}
                    //renderDotContent={({x, y, index}) => <DotContent key={index} x={x} y={y} value={data.datasets[0].data[index]}/>}
                />
                </View>

                <FlatList
                    data = {list}
                    renderItem = {({item}) => (
                        <View style = {styles.list}>
                            <Text style = {styles.listText}>
                                {item['date']}:
                            </Text>
                            <Text style = {styles.listTextDrank}>  {item['drank']}ml</Text>
                        </View>
                    )}
                    style = {styles.listContainer}
                    keyExtractor = {(item, index) => index.toString()}/>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Math.round(Dimensions.get('window').height),
        width: Math.round(Dimensions.get('window').width),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    graph: {
        paddingTop: Math.round(Dimensions.get('window').height*0.03),
        paddingBottom: -Math.round(Dimensions.get('window').height*0.015)
    },
    listContainer: {
        width: Math.round(Dimensions.get('window').width),
        borderTopWidth: 3,
        borderColor: 'skyblue'
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'skyblue',
        borderBottomWidth: 1,
        paddingVertical: Math.round(Dimensions.get('window').height*0.03)
    },
    listText: {
        fontSize: 16,
        color: 'skyblue'
    },
    listTextDrank: {
        color: 'skyblue',
        fontWeight: 'bold',
        fontSize: 16,
    },
})