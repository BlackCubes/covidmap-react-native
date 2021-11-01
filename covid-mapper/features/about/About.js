import * as React from "react";
import { SafeAreaView, FlatList, Text, } from "react-native";
import styled from "styled-components/native";
import Spinner from "../../commons/components/Spinner/Spinner";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import AboutSection from "./component/AboutSection";
import {teamData} from '../../utils/teamData';

const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  padding-right: 5%;
  padding-left: 5%;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

const LineSeparator = styled.View`
  height: 1px;
  background-color: #ddd;
  width: 90%;
  margin: 0 auto;
  margin: 20px;
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
        <SafeAreaView>
          <Container>
            <Title
              style={{ fontFamily: "NotoSans_400Regular", textAlign: "center", paddingTop: '10%' }}
            >
              Our Story{"\n"}
            </Title>
            <Text style={{ fontFamily: "NotoSans_400Regular", textAlign: "center" }}>
              We are a team of developers from Central California learning React
              Native for mobile app development.{"\n"} Our developer team consists of:
            </Text>
            <FlatList
              data={teamData}
              ItemSeparatorComponent={() => <LineSeparator />}
              removeClippedSubviews={true}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => {
                  return (
                    <AboutSection item={item}/>
                  )
              }}
            />
          </Container>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};
export default About;
