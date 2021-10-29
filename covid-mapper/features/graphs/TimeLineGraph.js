import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import numSeparator from "../../utils/numSeparator";

const chartWidth = Dimensions.get("window").width - 30;
const chartHeight = Dimensions.get("window").width - 20;

const CasesOverTimeGraph = ({ graphData }) => {
  if (!graphData) return null;

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text style={{ textAlign: "center" }}>Last 30 Days cases/time</Text>
      <LineChart
        data={{
          labels: graphData.map((point) => point.x),
          datasets: [
            {
              data: graphData.map((point) => {
                return point.y ;
              }),
            },
          ],
        }}
        width={chartWidth} // from react-native
        height={chartHeight}
        yAxisInterval={1.7} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#092979",
          backgroundGradientTo: "#00b5ff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "1",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 8,
        }}
        formatXLabel={(value) =>
          parseInt(value.split("/")[1]) % 2 == 0 ? value : ""
        }
        formatYLabel={(value) => numSeparator(value / 1000 ? value : "")}
        verticalLabelRotation={90}
        horizontalLabelRotation={-45}
      />
    </View>
  );
};

export default CasesOverTimeGraph;
