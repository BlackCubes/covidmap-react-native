import React from "react";
import { Dimensions, View, Text, SafeAreaView } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import Spinner from "../../commons/components/Spinner/Spinner";

const chartWidth = Dimensions.get("window").width - 30;
const chartHeight = Dimensions.get("window").width - 20;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientTo: "#092979",
  backgroundGradientFrom: "#08130D",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(148, 234, 220, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const subTitle = (deaths, population, recovered) => {
  const subTitlesArray = [];
  let subTitlesEnding = "cases";

  if (population > 0) {
    subTitlesArray.push("cases");

    subTitlesEnding = "pop.";
  }

  if (recovered > 0) subTitlesArray.push("recovered");

  if (deaths > 0) subTitlesArray.push("deaths");

  return `(on ${subTitlesArray.join("/")} per ${subTitlesEnding})`;
};

const OverviewGraph = ({ cases, deaths, population, recovered }) => {
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
    labels: [],
    data: [],
  };

  const divideBy = population > 0 ? population : cases;

  if (deaths) {
    data.labels.push("Deaths");

    data.data.push(deaths / divideBy);
  }

  if (recovered) {
    data.labels.push("Recovered");

    data.data.push(recovered / divideBy);
  }

  if (population && population > 0 && cases) {
    data.labels.push("Cases");

    data.data.push(cases / divideBy);
  }

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text style={{ textAlign: "center", fontFamily: "NotoSans_400Regular" }}>
        Summary {subTitle(deaths, population, recovered)}
      </Text>
      {/* CHART */}
      <ProgressChart
        data={data}
        width={chartWidth}
        height={chartHeight}
        strokeWidth={5}
        radius={19}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default OverviewGraph;
