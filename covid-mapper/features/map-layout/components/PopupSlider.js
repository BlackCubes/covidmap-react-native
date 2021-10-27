import React from "react";
import styled from "styled-components/native";
import Spinner from "../../../commons/components/Spinner/Spinner";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CasesOverTimeGraph from "../../graphs/TimeLineGraph";
import numSeparator from "../../../utils/numSeparator";

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
      {typeof sliderData === "object" && !Array.isArray(sliderData) ? (
        <USStateWrapper>
          <USStateMain>
            <USStateMainHeader>{sliderHeader}</USStateMainHeader>

            <USStatePopulation>
              400 million population size, Merica!!!!
            </USStatePopulation>
          </USStateMain>
          <USStateUpdate>(updated on {Date(new Date())})</USStateUpdate>

          <USStateInfo>
            {sliderData.provinces.length > 0 && (
              <USStateInfoValues>{sliderData.provinces}</USStateInfoValues>
            )}
            {sliderData.county.length > 0 && (
              <USStateInfoValues>{sliderData.county}</USStateInfoValues>
            )}
            {!sliderData.hasTimelineSequence && (
              <USStateInfoValues>
                Cases: {numSeparator(sliderData.cases)}
              </USStateInfoValues>
            )}
            {!sliderData.hasTimelineSequence && (
              <USStateInfoValues>
                Recovered: {numSeparator(sliderData.recovered)} or{" "}
                {((sliderData.recovered / sliderData.cases) * 100).toPrecision(
                  4
                )}
                %{" "}
              </USStateInfoValues>
            )}
            {!sliderData.hasTimelineSequence && (
              <USStateInfoValues>
                Deaths: {numSeparator(sliderData.deaths)} or{" "}
                {((sliderData.deaths / sliderData.cases) * 100).toPrecision(4)}%
              </USStateInfoValues>
            )}
          </USStateInfo>
          <CasesOverTimeGraph />
        </USStateWrapper>
      ) : (
        <BottomSheetFlatList
          data={sliderData}
          initialNumToRender={2}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <USStateWrapper>
              <USStateMain>
                <USStateMainHeader>{sliderHeader}</USStateMainHeader>

                <USStatePopulation>
                  400 million population size, Merica!!!!
                </USStatePopulation>
              </USStateMain>
              <USStateUpdate>(updated on {Date(new Date())})</USStateUpdate>

              <USStateInfo>
                {item.provinces.length > 0 && (
                  <USStateInfoValues>{item.provinces}</USStateInfoValues>
                )}
                {item.county.length > 0 && (
                  <USStateInfoValues>{item.county}</USStateInfoValues>
                )}
                {!item.hasTimelineSequence && (
                  <USStateInfoValues>
                    Cases: {numSeparator(item.cases)}
                  </USStateInfoValues>
                )}
                {!item.hasTimelineSequence && (
                  <USStateInfoValues>
                    Recovered: {numSeparator(item.recovered)} or{" "}
                    {((item.recovered / item.cases) * 100).toPrecision(4)}%{" "}
                  </USStateInfoValues>
                )}
                {!item.hasTimelineSequence && (
                  <USStateInfoValues>
                    Deaths: {numSeparator(item.deaths)} or{" "}
                    {((item.deaths / item.cases) * 100).toPrecision(4)}%
                  </USStateInfoValues>
                )}
              </USStateInfo>
              <CasesOverTimeGraph />
            </USStateWrapper>
          )}
        />
      )}
    </BottomSheetModal>
  );
};

export default PopupSlider;
