import * as React from "react";
import { Button, View, Text, useWindowDimensions, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import DrawerContent from "./DrawerContent";
import MapLayout from "../map-layout/MapLayout";
import VaccineLayout from "../vaccine-layout/VaccineLayout";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import Spinner from "../../commons/components/Spinner/Spinner";
const Drawer = createDrawerNavigator();

function AboutUsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About Us screen</Text>
      <Button
        onPress={() => navigation.navigate("World")}
        title="Go to World Stat"
      />
    </View>
  );
}
const DrawerMenu = () => {
  const dimensions = useWindowDimensions();
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular
  });
  if (!fontsLoaded) return (<SafeAreaView>
      <Spinner/>
</SafeAreaView>);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="World"
        screenOptions={{
          drawerStyle: {
            width: 320,
            paddingTop: 0,
          },
          drawerType: dimensions.width >= 768 ? "permanent" : "front",
          drawerHideStatusBarOnOpen: true,
          headerStyle: { 
            backgroundColor: "#2EC2A0",
            height: 80,
           },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold",  fontFamily: 'NotoSans_400Regular' },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        {/* WORLD */}
        <Drawer.Screen name="World" component={MapLayout} />
        <Drawer.Screen name="Country Province Stats" component={MapLayout} />
        {/* US */}
        <Drawer.Screen name="US Total" component={MapLayout} />
        <Drawer.Screen name="State Counties Totals" component={MapLayout} />

        {/* Vaccine */}
        <Drawer.Screen name="World Vaccination Totals" component={MapLayout} />
        <Drawer.Screen name="Country Vaccination Total" component={MapLayout} />
        <Drawer.Screen name="US Vaccination Total" component={MapLayout} />
        <Drawer.Screen name="State Vaccination Total" component={MapLayout} />
        <Drawer.Screen name="Trial Data" component={VaccineLayout} />

        {/* Bottom Content */}
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerMenu;
