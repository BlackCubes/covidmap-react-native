import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const DUMMY_DATA = [
  { x: "9/25/21", y: 116800 },
  { x: "9/26/21", y: 116800 },
  { x: "9/27/21", y: 117387 },
  { x: "9/28/21", y: 117517 },
  { x: "9/29/21", y: 117655}
];

const chartWidth = Dimensions.get("window").width - 40;
const chartHeight = Dimensions.get("window").width - 20;

const CasesOverTimeGraph = () => {
  return (
    <View style={{
        width: '100%',
    }}>
        <Text style={{textAlign: 'center'}}>Cases over Time</Text>
      <LineChart
        data={{
          labels: DUMMY_DATA.map((point) => point.x),
          datasets: [
            {
              data: DUMMY_DATA.map((point) => {
                return point.y;
              }),
            },
          ],
        }}
        width={chartWidth} // from react-native
        height={chartHeight}
        yAxisInterval={0.5} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "blue",
          backgroundGradientTo: "#000",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />
    </View>
  );
};

export default CasesOverTimeGraph;
