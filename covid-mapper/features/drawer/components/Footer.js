import * as React from "react";
import * as Linking from "expo-linking";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { GithubIcon, ToadIcon } from "../../../commons/components/Icons";

const BottomInfoContainer = styled.View`
  min-height: 20px;
  width: 100%;
  z-index: -100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 2% 10% 20% 10%;
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
  font-weight: 500;
  padding-left: 4px;
`;

const VersionInfoText = styled.Text`
  color: rgba(53, 104, 147, 0.7);
  font-size: 12px;
`;

const Footer = (props) => {
  return (
    <BottomInfoContainer>
      {/* About Us button */}
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
      {/* Github button */}
      <Pressable
        onPress={() =>
          Linking.openURL("https://github.com/BlackCubes/covidmap-react-native")
        }
      >
        <BottomButtonView>
          <GithubIcon />
          <BottomInfoText>Github</BottomInfoText>
        </BottomButtonView>
      </Pressable>

      <VersionInfoText>v 0.2.0</VersionInfoText>
    </BottomInfoContainer>
  );
};

export default Footer;
