import React from "react";
import { Dimensions, View, Text, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import numSeparator from "../../utils/numSeparator";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import Spinner from "../../commons/components/Spinner/Spinner";

const chartWidth = Dimensions.get("window").width - 30;
const chartHeight = Dimensions.get("window").width - 20;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#092979",
  backgroundGradientTo: "#00b5ff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(245, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "2",
    strokeWidth: "2",
  },
};

const CasesOverTimeGraph = ({ cases, deaths, recovered }) => {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontsLoaded || !cases)
    return (
      <SafeAreaView>
        <View
          style={{
            width: "100%",
          }}
        >
          <Spinner />
        </View>
      </SafeAreaView>
    );

  const data = {
    labels: cases.map((point) => point.x), // array of date strings
    datasets: [
      {
        data: cases.map((point) => point.y),
        color: (opacity = 1) => `rgba(255,167,38,${opacity})`, // should be violet
      },
      {
        data: deaths.map((point) => point.y), //map over deaths
        color: (opacity = 1) => `rgba(250, 21, 55, ${opacity})`, // should be BLUE GRAY
      },
      {
        data: recovered?.map((point) => point.y), //map over recovered(?),
        color: (opacity = 1) => `rgba(67, 255, 100, ${opacity})`, // should be yellowish
      },
    ],
    legend: ["Cases", "Deaths", "Recovered"],
  };

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text style={{ textAlign: "center", fontFamily: "NotoSans_400Regular" }}>
        Data from Past 30 Days
      </Text>
      {/* CHART */}
      <LineChart
        data={data}
        width={chartWidth}
        height={chartHeight}
        yAxisInterval={1.7} // optional, defaults to 1
        chartConfig={chartConfig}
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
