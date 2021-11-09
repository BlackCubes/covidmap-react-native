import * as React from "react";
import { SafeAreaView, Text, ScrollView, Image } from "react-native";
import styled from "styled-components/native";
import Spinner from "../../commons/components/Spinner/Spinner";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import AboutSection from "./component/AboutSection";
import { teamData } from "../../utils/teamData";

const Container = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  padding-right: 8%;
  padding-left: 8%;
  padding-top: 4%;
  margin-bottom: 10%;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  text-decoration: underline;
  padding: 4% 0% 4% 4%;
`;

const LogoImage = styled.Image`
  margin: 0 auto;
  opacity: 0.8;
  height: 140px;
  width: 140px;
`;

const Intro = styled.Text`
  text-align: center;
  font-size: 18px;
`;

const About = () => {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });

  return (
    <SafeAreaView>
      {!fontsLoaded ? (
        <Spinner />
      ) : (
        <ScrollView>
          <Container>
            <LogoImage source={require("../../assets/logo.png")} />

            <Title
              style={{
                fontFamily: "NotoSans_400Regular",
                textAlign: "center",
                padding: "6%",
              }}
            >
              Our Story
            </Title>
            <Intro style={{ fontFamily: "NotoSans_400Regular" }}>
              We are software engineers based in Central California, coming
              together from various backgrounds to learn React and React Native
              for app development.
              {"\n\n"}
              This project is actually our first mobile app ever, and it is
              cross-platform (built for both Android and iOS).{"\n\n"}
            </Intro>
            <Title
              style={{ fontFamily: "NotoSans_400Regular", textAlign: "center" }}
            >
              Our Team
            </Title>
            {teamData.map((person) => (
              <AboutSection key={person.name} item={person} />
            ))}
          </Container>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default About;
