
import * as React from "react";
import * as Linking from "expo-linking";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import {
    GithubIcon,
    ToadIcon,
  } from "../../../commons/components/Icons";

  const BottomInfoContainer = styled.View`
    height: 5%;
    width: 100%;
    z-index: -100;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0% 10% 2% 10%;
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

const Footer=()=>{
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
        </BottomInfoContainer>);
}

export default Footer;