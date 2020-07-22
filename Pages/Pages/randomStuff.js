<AnimatedCircularProgress
    size={300}
    width={8}
    fill = {}
    rotation = {0}
    tintColor="skyblue"
    backgroundColor="white">
    { (fill) => (
        <Text style = {styles.ringText}>
            {(per>100) ? 100.00 : per.toFixed(1)}%
        </Text>
    ) }
    
</AnimatedCircularProgress>
/*const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 90, 100]
              }
            ]
        };*/
<BarChart
                    style={styles.graph}
                    data={data}
                    width={screenWidth}
                    height={300}
                    yAxisSuffix="ml"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    showValuesOnTopOfBars = {true}
                    fromZero = {true}
                />

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

<BlueButton style = {styles.sync} onPress = {() => {this.forceUpdate()}}>
                        Sync
                </BlueButton>