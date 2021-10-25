import React, { useCallback, useMemo, useRef } from "react";
import styled from "styled-components/native";
import { useGetCountryHistoricalQuery } from "../../../api/covidApi";
import Spinner from "../../../commons/components/Spinner/Spinner";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CasesOverTimeGraph from "../../graphs/TimeLineGraph";
const PopUpTitle = styled.Text`
  font-size: 20px;
  color: #18181f;
  margin: 20px 100px 10px 20px;
`;

const PopupContentContainer = styled.View`
  display: flex;
  justify-content: center;
  padding: 2%;
`;

const PopupContent = styled.Text`
  font-size: 15px;
  color: #18181f;
`;

const PopupButtonTest = styled.Button`
  margin-top: 0;
  position: absolute;
  bottom: 0;
`;


const PopupSlider = ({ searchCountry }) => {

  const {
    data: countryData,
    isLoading,
    error,
  } = useGetCountryHistoricalQuery(searchCountry);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  if (error) {
    return (<>
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
        <PopupContentContainer>
          <PopupContent>Error {error.status}: {error.data.message}</PopupContent>
        </PopupContentContainer>
      </BottomSheetModal>
      </>
    );
  }

  if (isLoading || !countryData)
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <Spinner />
      </BottomSheetModal>
    );

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
        <BottomSheetFlatList
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
                  {/* GRAPH */}
                  <CasesOverTimeGraph />
              </PopupContentContainer>
            </>
          )}
        />
      </BottomSheetModal>
    </>
  );
};

export default PopupSlider;
