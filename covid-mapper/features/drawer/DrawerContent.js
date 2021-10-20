import * as React from "react";
import * as Linking from "expo-linking";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import styled from "styled-components/native";
import { Pressable, View } from "react-native";
import { GithubIcon, ToadIcon } from "../../commons/components/Icons";

const DrawerContentContainer = styled.View`
  flex: 1;
`;

const DrawerSection = styled.View`
  padding: 5px 10px 5px 10px;
`;

const SectionDivider = styled.View`
  height: 1px;
  background-color: #ccc;
  width: 100%;
`;

const LogoContainer = styled.View`
  height: 10%;
  width: 100%;
  background-color: #203f59;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomInfoContainer = styled.View`
  height: 8%;
  z-index: -100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 80px 0px 80px;
  background-color: #fafafa;
`;

const BottomButtonView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 20px 0px 0px;
`;

const BottomInfoText = styled.Text`
  color: #203f59;
  font-weight: bold;
  padding-left: 4px;
`;

const GreenBorder = styled.View`
  border-bottom-width: 4px;
  border-bottom-color: #77c280;
`;

const LogoText = styled.Text`
  color: #ddd;
  font-weight: bold;
  font-size: 20px;
`;

const LogoImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 3px;
  margin-right: 4px;
`;

const Heading = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #203f59;
`;

const DrawerContent = (props) => {
  return (
    <DrawerContentContainer>
      <DrawerContentScrollView {...props}>
        <LogoContainer>
          {/* Logo */}
          <LogoImage source={require("../../assets/logo.png")} />
          <LogoText>COVID Mapper</LogoText>
        </LogoContainer>
        <GreenBorder></GreenBorder>
        {/*End Logo section and Begin DrawerItems section */}
        <DrawerSection>
          {/* World total section */}
          <Heading>World</Heading>
          {/* endpoint: /v3/covid-19/all AND /v3/covid-19/countries */}
          <DrawerItem
            label="World Total &amp; By Country"
            onPress={() => {
              props.navigation.navigate("World");
            }}
          />
          {/* endpoint: /v3/covid-19/historical/{country}/{province} */}
          <DrawerItem
            label="Search Country/Province"
            onPress={() => {
              props.navigation.navigate("Country Province Stats");
            }}
          />
          <SectionDivider/>
        </DrawerSection>
        {/* Start USA section */}
        <DrawerSection>
          <Heading>U.S.</Heading>
          {/* endpoint: /v3/covid-19/states - totals for all US states */}
          <DrawerItem
            label="US Total &amp; All States"
            onPress={() => {
              props.navigation.navigate("US Total");
            }}
          />
          {/* endpoint: /v3/covid-19/historical/usacounties/{state} */}
          <DrawerItem
            label="Search State/Counties Data"
            onPress={() => {
              props.navigation.navigate("State Counties Totals");
            }}
          />
          <SectionDivider/>
        </DrawerSection>

        {/* Start Vaccination section */}
        <DrawerSection>
          <Heading>Vaccination Doses Administered &amp; Trial Data</Heading>
          {/* endpoints to use: /vaccine/coverage AND /vaccine/coverage/countries */}
          <DrawerItem
            label="World Total &amp; All Countries"
            onPress={() => {
              props.navigation.navigate("World Vaccination Totals");
            }}
          />
          <DrawerItem
            label="Search Total by Country"
            onPress={() => {
              props.navigation.navigate("Country Vaccination Total");
            }}
          />
          {/* endpoint to use: /vaccine/coverage/states */}
          <DrawerItem
            label="US National Total"
            onPress={() => {
              props.navigation.navigate("US Vaccination Total");
            }}
          />
          {/* endpoint to use: /vaccine/coverage/states/${state} */}
          <DrawerItem
            label="Specific State &amp; Counties(US)"
            onPress={() => {
              props.navigation.navigate("State Vaccination Total");
            }}
          />
          {/* endpoint to use: /vaccine  */}
          <DrawerItem
            label="Vaccine Trial Data"
            onPress={() => {
              props.navigation.navigate("Trial Data");
            }}
          />
        </DrawerSection>
      </DrawerContentScrollView>
      {/* Github & About Us */}
      <BottomInfoContainer>
        <Pressable
          onPress={() => {
            props.navigation.navigate("About Us");
          }}
        >
          <BottomButtonView>
            <ToadIcon />
            <BottomInfoText>About Us</BottomInfoText>
          </BottomButtonView>
        </Pressable>
        {/* Github  */}
        <Pressable
          onPress={() =>
            Linking.openURL(
              "https://github.com/BlackCubes/covidmap-react-native"
            )
          }
        >
          <BottomButtonView>
            <GithubIcon />
            <BottomInfoText>Github</BottomInfoText>
          </BottomButtonView>
        </Pressable>
      </BottomInfoContainer>
    </DrawerContentContainer>
  );
};

export default DrawerContent;
