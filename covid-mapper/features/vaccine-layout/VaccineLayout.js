import React, { useState } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import styled from "styled-components/native";
import VaccineItem from "./components/VaccineItem";
import { useGetVaccinesTrialDataQuery } from "../../api/covidApi";
import Spinner from "../../commons/components/Spinner/Spinner";
import uuid from "react-native-uuid";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";

const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  height: 10%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #203f59;
  border-style: solid;
  border-bottom-width: 4px;
  border-bottom-color: #77c280;
  justify-content: center;
  align-items: center;
  z-index: -5;
`;

const LineSeparator = styled.View`
  height: 2px;
  background-color: #ccc;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
`;

const ListContainer = styled.View`
  padding-top: 20%;
  margin-bottom: 2%;
`;

const VaccineLayout = () => {
  const { data: trialData, isLoading, error } = useGetVaccinesTrialDataQuery();
  const [hideText, setHideText] = useState(true);
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });
  if (error) {
    return (
      <SafeAreaView>
        <Container>
          <Text>Error: {error}</Text>;
        </Container>
      </SafeAreaView>
    );
  }

  if (isLoading || !fontsLoaded || !trialData)
    return (
      <SafeAreaView>
        <Container>
          <Spinner />
        </Container>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <Text style={{ color: "#F6F6F6", fontSize: 18 }}>
            Vaccine Candidates in Development
          </Text>
        </Header>
        {/* List starts here */}
        <ListContainer>
          <FlatList
            data={trialData["data"]}
            ItemSeparatorComponent={() => <LineSeparator />}
            initialNumToRender={5}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <VaccineItem
                key={uuid.v4()}
                candidate={item.candidate}
                mechanism={item.mechanism}
                institutions={item.institutions}
                details={item.details}
                sponsors={item.sponsors}
                trialPhase={item.trialPhase}
                hideText={hideText}
                setHideText={setHideText}
              />
            )}
          />
        </ListContainer>
      </Container>
    </SafeAreaView>
  );
};

export default VaccineLayout;
