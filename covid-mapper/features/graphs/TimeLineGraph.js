import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const chartWidth = Dimensions.get("window").width - 40;
const chartHeight = Dimensions.get("window").width - 20;

const CasesOverTimeGraph = ({ graphData }) => {
  if (!graphData) return null;

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text style={{ textAlign: "center" }}>Cases over Time</Text>
      <LineChart
        data={{
          labels: graphData.map((point) => point.x),
          datasets: [
            {
              data: graphData.map((point) => {
                return point.y;
              }),
            },
          ],
        }}
        width={chartWidth} // from react-native
        height={chartHeight}
        yAxisInterval={4} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "blue",
          backgroundGradientTo: "#000",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "2",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
        formatXLabel={(value) => parseInt(value.split('/')[1]) % 7 == 0 ? value : ''}
        // formatYLabel={(value) => value % 2 === 0 ? value : '' }
        
      />
    </View>
  );
};

export default CasesOverTimeGraph;
