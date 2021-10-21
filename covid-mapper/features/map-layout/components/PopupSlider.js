import React, { useCallback, useMemo, useRef } from "react";
import styled from "styled-components/native";
import {
  useGetCountryHistoricalQuery,
} from "../../../api/covidApi";
import Spinner from "../../../commons/components/Spinner/Spinner";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";

const PopUpTitle = styled.Text`
  font-size: 20px;
  color: black;
  margin: 20px 120px 10px 20px;
`;

const PopupContentContainer = styled.View`
  justify-content: flex-start;
  margin-left: 50px;
`;

const PopupContent = styled.Text`
  font-size: 15px;
  color: black;
`;

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

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (error) {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <PopupError>Error: {error}</PopupError>
      </BottomSheetModal>
    );
  }

  if (isLoading || !countryData)
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <Spinner />
      </BottomSheetModal>
    );

  return (
    <>
      <PopupButtonTest
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetFlatList
          data={countryData}
          initialNumToRender={4}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <>
              <PopUpTitle>Lates from: {item.country}</PopUpTitle>
              <PopupContentContainer>
                <PopupContent>
                  Location: {item.province ? item.province : item.country}
                </PopupContent>
                <PopupContent>Updated at: {item.dates}</PopupContent>
                <PopupContent>Confirmed Cases: {item.cases}</PopupContent>
                <PopupContent>Deaths: {}</PopupContent>
                <PopupContent>Recovered: {}</PopupContent>
              </PopupContentContainer>
            </>
          )}
        />
      </BottomSheetModal>
    </>
  );
};

export default PopupSlider;
