import React, { useCallback, useMemo, useRef } from "react";
import { View, Text } from "react-native"
import styled from "styled-components/native";
import {
  useGetCountryHistoricalQuery,
  useGetGlobalCovidStatsQuery,
  useGetTotalOneUSStateQuery
} from "../../../api/covidApi";
import Spinner from "../../../commons/components/Spinner/Spinner";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CasesOverTimeGraph from "../../graphs/TimeLineGraph";

function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

const PopupButtonTest = styled.Button`
  margin-top: 0;
  position: absolute;
  bottom: 0;
`;

const PopupError = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const USStateWrapper = styled.View`
  padding: 17px;
`;

const USStateMain = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const USStateMainHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
`;

const USStatePopulation = styled.Text`
  font-size: 10px;
  margin-bottom: 4px;
`;

const USStateUpdate = styled.Text`
  font-size: 10px;
  margin-bottom: 10px;
  `


const PopupContentContainer = styled.View`
  display: flex;
  justify-content: center;
  padding: 2%;
`;

const PopupContent = styled.Text`
  font-size: 15px;
  color: #18181f;
`;

const USStateInfo = styled.View`
  margin-bottom: 10px;
`;

const USStateInfoHeader = styled.Text`
  font-size: 15px;
  text-decoration: underline;
`;

const USStateInfoValues = styled.Text`
  font-size: 18px;
`;


const PopupSlider = ({ searchCountry }) => {

  const {
    data: countryData,
    isLoading: countryLoading,
    error: countryError,
  } = useGetCountryHistoricalQuery('China');
  const {
    data: worldData,
    isLoading: worldLoading,
    error: worldError,
  } = useGetGlobalCovidStatsQuery();
  const {
    data: stateData,
    isLoading: stateLoading,
    error: stateError,
  } = useGetTotalOneUSStateQuery('california');


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Might need it in the future:
  // if (error) {
  //   return (<>
  //   <PopupButtonTest
  //       onPress={handlePresentModalPress}
  //       title="Present Slider"
  //       color="#18181F"
  //     />
  //     <BottomSheetModal
  //       ref={bottomSheetModalRef}
  //       index={1}
  //       snapPoints={snapPoints}
  //     >
  //       <PopupContentContainer>
  //         <PopupContent>Error {error.status}: {error.data.message}</PopupContent>
  //       </PopupContentContainer>
  //     </BottomSheetModal>
  //     </>
  //   );
  // }


  return (
    <>
      <PopupButtonTest
        onPress={handlePresentModalPress}
        title="Present Slider"
        color="#18181F"
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >

        {stateLoading
          ? <Spinner/>
          : stateError
          ? <Text>Error!</Text>
          : (
        <USStateWrapper>
          <USStateMain>
            <USStateMainHeader>
              World Data
            </USStateMainHeader>

            <USStatePopulation>400 million population size, Merica!!!!</USStatePopulation>
          </USStateMain>
          <USStateUpdate>(updated on {Date(new Date())})</USStateUpdate>

          <USStateInfo>
            {stateData.provinces.length > 0 && (<USStateInfoValues>{stateData.provinces}</USStateInfoValues>)}
            {stateData.county.length > 0 && (<USStateInfoValues>{stateData.county}</USStateInfoValues>)}
            {!stateData.hasTimelineSequence && (<USStateInfoValues>Cases: {separator(stateData.cases)}</USStateInfoValues>)}
            {!stateData.hasTimelineSequence && (<USStateInfoValues>Recovered: {separator(stateData.recovered)} or {(stateData.recovered/stateData.cases * 100).toPrecision(4)}% </USStateInfoValues>)}
            {!stateData.hasTimelineSequence && (<USStateInfoValues>Deaths: {separator(stateData.deaths)} or {(stateData.deaths/stateData.cases * 100).toPrecision(4)}%</USStateInfoValues>)}
          </USStateInfo>
          <CasesOverTimeGraph/>
        </USStateWrapper>   
        )}
  
        {/* Might need it later for testing purposes */}
        {/* <BottomSheetFlatList
          data={countryData}
          initialNumToRender={2}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <>
              <PopUpTitle>Lates from: {item.country}</PopUpTitle>
              <PopupContentContainer>
                <PopupContent>
                  Location: {item.province ? item.province : item.country}
                </PopupContent>
                <PopupContent>Updated at: {}</PopupContent>
                <PopupContent>Confirmed Cases: {item.cases}</PopupContent>
                <PopupContent>Deaths: {}</PopupContent>
                <PopupContent>Recovered: {}</PopupContent>
            
                  <CasesOverTimeGraph />
              </PopupContentContainer>
            </>
          )}
        /> */}
      </BottomSheetModal>
    </>
  );
};

export default PopupSlider;
