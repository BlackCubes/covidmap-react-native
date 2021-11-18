import React, { useState } from "react";
import { Dimensions, View, Text, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import numSeparator from "../../utils/numSeparator";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import Spinner from "../../commons/components/Spinner/Spinner";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

const chartWidth = Dimensions.get("window").width - 30;
const chartHeight = Dimensions.get("window").width - 20;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientTo: "#092979",
  backgroundGradientFrom: "#08130D",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(245, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "2", // dot radius
  },
};

const CasesOverTimeGraph = ({ cases, deaths, recovered, hasVaccines }) => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    toolTipX: "",
    toolTipY: 0,
  });

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

  // const data = {
  //   labels: cases.map((point) => point.x), // array of date strings
  //   datasets: [
  //     {
  //       data: cases.map((point) => point.y),
  //       color: (opacity = 1) => `rgba(255,167,38,${opacity})`, // yellow
  //     },
  //     {
  //       data: deaths.map((point) => point.y), //map over deaths
  //       color: (opacity = 1) => `rgba(250, 21, 55, ${opacity})`, // red
  //     },
  //     {
  //       data: recovered?.map((point) => point.y), // if 'recovered' is available
  //       color: (opacity = 1) => `rgba(67, 255, 100, ${opacity})`, // green
  //     },
  //   ],
  //   legend: ["Cases", "Deaths", "Recovered"],
  // };
  const data = {
    labels: cases.map((point) => point.x),
    datasets: [],
    legend: [],
  };

  if (cases?.length) {
    data.datasets.push({
      data: cases.map((point) => point.y),
      color: (opacity = 1) => `rgba(255,167,38,${opacity})`, // yellow
    });
    const labelValue = hasVaccines ? "Vaccinated" : "Cases";
    data.legend.push(labelValue);
  }

  if (deaths?.length) {
    data.datasets.push({
      data: deaths.map((point) => point.y), //map over deaths
      color: (opacity = 1) => `rgba(250, 21, 55, ${opacity})`, // red
    });
    data.legend.push("Deaths");
  }

  if (recovered?.length) {
    data.datasets.push({
      data: recovered?.map((point) => point.y), // if 'recovered' is available
      color: (opacity = 1) => `rgba(67, 255, 100, ${opacity})`, // green
    });
    data.legend.push("Recovered");
  }

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
        decorator={() => {
          return tooltipPos.visible ? (
            <View>
              <Svg>
                <Rect
                  x={tooltipPos.x - 25}
                  y={tooltipPos.y + 18}
                  width="80"
                  height="25"
                  fill="#549185"
                  rx={6}
                />
                <TextSVG
                  // Text Alignment
                  x={tooltipPos.x - 14}
                  y={tooltipPos.y + 32} // increase to lower
                  fill="white"
                  fontSize="10"
                  style={{ textAlign: "center" }}
                >
                  {numSeparator(tooltipPos.value)}
                </TextSVG>
              </Svg>
            </View>
          ) : null;
        }}
        onDataPointClick={(data) => {
          let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y; // boolean

          isSamePoint
            ? setTooltipPos((previousState) => {
                return {
                  ...previousState,
                  value: data.value,
                  visible: !previousState.visible,
                };
              })
            : setTooltipPos({
                x: data.x,
                value: data.value,
                y: data.y,
                visible: true,
              });
        }}
      />
    </View>
  );
};

export default CasesOverTimeGraph;
