import React from "react";
import styled from "styled-components/native";
import Spinner from "../../../../commons/components/Spinner/Spinner";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { capitalize } from "../../../../utils";
import PopupSliderData from "./PopupSliderData";

const PopupSliderHeader = styled.View`
  padding-top: 17px;
  padding-right: 10px;
  padding-left: 10px;
`;

const PopupSliderHeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
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

const PopupSlider = ({
  sliderData,
  sliderDataLoading,
  sliderDataError,
  sliderHeader,
  snapPoints,
  bottomSheetModalRef,
}) => {
  if (sliderDataLoading)
    return (
      <BottomSheetModal>
        <PopupContentContainer>
          <PopupContent>
            <Spinner />
          </PopupContent>
        </PopupContentContainer>
      </BottomSheetModal>
    );

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
          {capitalize(sliderHeader, true)}
        </PopupSliderHeaderText>
      </PopupSliderHeader>

      {typeof sliderData === "object" && !Array.isArray(sliderData) ? (
        <BottomSheetScrollView>
          <PopupSliderData
            cases={sliderData.cases}
            county={sliderData.county}
            deaths={sliderData.deaths}
            hasTimelineSequence={sliderData.hasTimelineSequence}
            provinces={sliderData.provinces}
            recovered={sliderData.recovered}
            state={sliderData.state}
          />
        </BottomSheetScrollView>
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
