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
  padding-right: 8%;
  padding-left: 8%;
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
              style={{ fontFamily: "NotoSans_400Regular", textAlign: "center", padding: '6%' }}
            >
              Our Story
            </Title>
            <Text style={{ fontFamily: "NotoSans_400Regular", textAlign: "center" }}>
              We are software engineers based in Central California, coming together from various backgrounds to learn React
              and React Native for app development. 
              {"\n\n"}
              This project is actually our first mobile app ever, and it is cross-platform (built for both Android and iOS).{"\n\n"} Our team consists of:
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
