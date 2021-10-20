import * as React from "react";
import * as Linking from "expo-linking";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import styled from "styled-components/native";

const DrawerContentContainer = styled.View`
  flex: 1;
`;

const DrawerSection = styled.View`
  padding: 5px;
  border: 1px solid #ddd;
`;

const LogoContainer = styled.View`
  height: 15%;
  width: 100%;
  background-color: #203f59;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomInfoContainer = styled.View`
  height: 15%;
  z-index: -100;
`;

// move GreenBorder to commmons folder later
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
  font-size: 16px;
  font-weight: bold;
  color: #203f59;
`;

const DrawerContent = (props) => {
  return (
    <DrawerContentContainer>
      <DrawerContentScrollView {...props}>
        <LogoContainer>
          {/* Logo */}
          <LogoImage source={require('../../assets/logo.png')}/>
          <LogoText>COVID Mapper</LogoText>
        </LogoContainer>
        <GreenBorder></GreenBorder>
        {/*End Logo section and Begin DrawerItems section */}
        <DrawerSection>
          {/* World total section */}
          <Heading>World</Heading>
         
          <DrawerItem
            label="World Stats"
            onPress={() => {
              props.navigation.navigate("World");
            }}
          />
          {/* Non-US Country > Province search */}
          <DrawerItem
            label="Search Country/Province"
            onPress={() => {
              props.navigation.navigate("Country Province Stats");
            }}
          />
        </DrawerSection>
        {/* Start USA section */}
        <DrawerSection>
          <Heading>U.S.</Heading>
          <DrawerItem
            label="National Stats"
            onPress={() => {
              props.navigation.navigate("Country Province Stats");
            }}
          />
          <DrawerItem
            label="Search State/County"
            onPress={() => {
              props.navigation.navigate("State Counties Totals");
            }}
          />
        </DrawerSection>
        {/* Start Vaccination section */}
        <DrawerSection>
          <Heading>Vaccination Stats &amp; Trial Data</Heading>
          {/* endpoint to use: /vaccine/coverage */}
          <DrawerItem
            label="World Vaccination Totals"
            onPress={() => {
              props.navigation.navigate("World Vaccination Totals");
            }}
          />
          <DrawerItem
            label="Search Vaccination Stats by Country"
            onPress={() => {
              props.navigation.navigate("US Vaccination Total");
            }}
          />
          {/* endpoint to use: /vaccine/coverage/states */}
          <DrawerItem
            label="US National Vaccination Total"
            onPress={() => {
              props.navigation.navigate("US Vaccination Total");
            }}
          />
          {/* endpoint to use: /vaccine/coverage/states/${state} */}
             <DrawerItem
            label="Search State Vaccination Stats(US)"
            onPress={() => {
              props.navigation.navigate("Search State(US) Vaccination Stats");
            }}
          />  
          {/* endpoint to use: /vaccine  */}
          <DrawerItem
            label="Trial Data"
            onPress={() => {
              props.navigation.navigate("Trial Data");
            }}
          />
        </DrawerSection>
      </DrawerContentScrollView>
      {/* Github & About Us */}
      <BottomInfoContainer>
        <DrawerItem
          label="About Us"
          onPress={() => {
            props.navigation.navigate("About Us");
          }}
        />
        <DrawerItem
          label="Github"
          onPress={() =>
            Linking.openURL(
              "https://github.com/BlackCubes/covidmap-react-native"
            )
          }
        />
      </BottomInfoContainer>
    </DrawerContentContainer>
  );
};

export default DrawerContent;
