import * as React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import styled from "styled-components/native";
import { View } from "react-native";
import {
  USAFlagIcon,
  GlobeIcon,
  SyringeIcon,
} from "../../../commons/components/Icons";
import Divider from "./SectionDivider";

const ContentSections = styled.View`
  padding: 0% 4% 0% 4%;
  background-color: #fafafa;
  height: -5%;
`;

const Heading = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #203f59;
  margin-top: 2%;
`;


const MainContent=(props)=>{
    return (<ContentSections>
        {/* World total section */}
        <Heading>
          World
          <View style={{ paddingLeft: 4 }}>
            <GlobeIcon />
          </View>
        </Heading>
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
        <Divider/>
        {/* </DrawerSection> */}
        {/* Start USA section */}
        {/* <DrawerSection> */}
        <Heading>
          U.S.
          <View style={{ paddingLeft: 4 }}>
            <USAFlagIcon />
          </View>
        </Heading>
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
        <Divider />
        {/* </DrawerSection> */}

        {/* Start Vaccination section */}
        {/* <DrawerSection> */}
        <Heading>
          Vaccine Doses Administered &amp; Trial
          <View style={{ paddingLeft: 4 }}>
            <SyringeIcon />
          </View>
        </Heading>
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
        <Divider/>
      </ContentSections>)
}

export default MainContent;