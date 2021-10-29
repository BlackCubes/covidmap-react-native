import React from "react";
import styled from "styled-components/native";
import Spinner from "../../../../commons/components/Spinner/Spinner";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CasesOverTimeGraph from "../../../graphs/TimeLineGraph";
import numSeparator from "../../../../utils/numSeparator";
import { capitalize } from "../../../../utils";
import PopupSliderData from "./PopupSliderData";

const PopupError = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupSliderContainer = styled.View`
  padding-right: 5px;
  padding-left: 5px;
`;

const PopupSliderHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-top: 17px;
  padding-right: 10px;
  padding-left: 10px;
`;

const PopupSliderHeaderText = styled.Text`
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

const PopupSlider = ({
  sliderData,
  sliderDataLoading,
  sliderDataError,
  sliderHeader,
  snapPoints,
  bottomSheetModalRef,
}) => {
  if (sliderDataLoading) return <Spinner />;

  if (sliderDataError) {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <PopupContentContainer>
          <PopupContent>
            Error {sliderDataError.status}: {sliderDataError.data.message}
          </PopupContent>
        </PopupContentContainer>
      </BottomSheetModal>
    );
  }

  if (!sliderData) return null;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "#F5F5F5" }}
    >
      <PopupSliderHeader>
        <PopupSliderHeaderText>
          {capitalize(sliderHeader)}
        </PopupSliderHeaderText>
      </PopupSliderHeader>

      {typeof sliderData === "object" && !Array.isArray(sliderData) ? (
        <PopupSliderData
          cases={sliderData.cases}
          county={sliderData.county}
          deaths={sliderData.deaths}
          hasTimelineSequence={sliderData.hasTimelineSequence}
          provinces={sliderData.provinces}
          recovered={sliderData.recovered}
          state={sliderData.state}
        />
      ) : (
        <BottomSheetFlatList
          data={sliderData}
          initialNumToRender={2}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <PopupSliderData
              cases={item.cases}
              county={item.county}
              deaths={item.deaths}
              hasTimelineSequence={item.hasTimelineSequence}
              provinces={item.provinces}
              recovered={item.recovered}
              state={item.state}
            />
          )}
        />
      )}
    </BottomSheetModal>
  );
};

export default PopupSlider;
