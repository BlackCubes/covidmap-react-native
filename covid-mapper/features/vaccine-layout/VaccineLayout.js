import * as React from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import styled from "styled-components/native";
import VaccineItem from "./components/VaccineItem";
import { useGetAllAvailableVaccinesQuery } from "../../api/covidApi";
import Spinner from '../../commons/components/Spinner/Spinner'

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
  const {
    data: trialData,
    isLoading,
    error,
  } = useGetAllAvailableVaccinesQuery();

  if (error) {
      return (<SafeAreaView>
        <Container>
         <Text>Error: {error}</Text>;
        </Container>
    </SafeAreaView>)
  };

  if (isLoading || !trialData) return (<SafeAreaView>
      <Container>
        <Spinner/>
      </Container>
  </SafeAreaView>);

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <Text style={{ color: "#F6F6F6", fontSize: 20 }}>
            Vaccine Candidates in Development
          </Text>
        </Header>
        {/* List starts here */}
        <ListContainer>
          <FlatList
            data={trialData["data"]} 
            ItemSeparatorComponent={() => <LineSeparator />}
            initialNumToRender={3}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <VaccineItem
                candidate={item.candidate}
                mechanism={item.mechanism}
                institutions={item.institutions}
                details={item.details}
                sponsors={item.sponsors}
                trialPhase={item.trialPhase}
              />
            )}
          />
        </ListContainer>
      </Container>
    </SafeAreaView>
  );
};

export default VaccineLayout;
