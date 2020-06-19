import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import {LineChart, BarChart, DotContent} from "react-native-chart-kit";
import firebase from '../firebaseDb.js'

export default class History extends Component {

    state = { 
        dataPoint:''
    }

    render() {
        /*const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 90, 100]
              }
            ]
        };*/
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                //color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            //legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
        };
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            fillShadowGradient: '#ffffff',
            fillShadowGradientOpacity: 1,
            strokeWidth: 2, // optional, default 3
            //barPercentage: 0.8,
            //useShadowColorFromDataset: false // optional
        };
        const screenWidth = Dimensions.get("window").width*0.98;
        
        return (
            <SafeAreaView style = {styles.container}>
                <Text>{this.state.dataPoint}</Text>
                <LineChart
                    style = {styles.graph}
                    data={data}
                    width={screenWidth}
                    height={Dimensions.get("window").height*0.35}
                    chartConfig={chartConfig}
                    fromZero = {true}
                    yAxisSuffix = 'ml'
                    yAxisInterval = {10}
                    //onDataPointClick ={() => this.setState({dataPoint: 5})}
                    //renderDotContent={({x, y, index}) => <DotContent key={index} x={x} y={y} value={data.datasets[0].data[index]}/>}
                    />
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
        paddingVertical: Math.round(Dimensions.get('window').height*0.01),
        backgroundColor: 'skyblue'
    },
    graph: {
        marginTop: Dimensions.get("window").height*0.3
        /*backgroundColor: 'skyblue',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        padding: 8,
        paddingTop: 25,
        paddingBottom: -10*/
    }
})