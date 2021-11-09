import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { capitalize, loadMore } from "../../../../utils";
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

const PAGE_SIZE = 10;

const PopupSlider = ({
  setSliderButton,
  sliderData,
  sliderHeader,
  bottomSheetModalRef,
}) => {
  const [dataLoader, setDataLoader] = useState([]);
  const [page, setPage] = useState(1);
  const snapPoints = useMemo(() => ["7%", "82%"], []);

  useEffect(() => {
    if (
      sliderData &&
      typeof sliderData === "object" &&
      Array.isArray(sliderData)
    ) {
      setDataLoader(sliderData.slice(0, PAGE_SIZE));
    }
  }, [sliderData]);

  if (!sliderData) return null;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "#F5F5F5" }}
      onChange={(index) => {
        // If the index is -1, then the slider has closed and therefore render the button.
        if (index === -1) setSliderButton(true);
        // Else, if it is greater than -1, then the slider is open and thus don't render
        // the button.
        else setSliderButton(false);
      }}
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
            country={sliderData.country}
            county={sliderData.county}
            deaths={sliderData.deaths}
            hasTimelineSequence={sliderData.hasTimelineSequence}
            population={sliderData.population}
            provinces={sliderData.provinces}
            recovered={sliderData.recovered}
            state={sliderData.state}
            updatedAt={sliderData.updatedAt}
          />
        </BottomSheetScrollView>
      ) : (
        <BottomSheetFlatList
          data={dataLoader}
          initialNumToRender={PAGE_SIZE}
          onEndReached={() => {
            setDataLoader((prevState) => {
              const newData = loadMore(sliderData, page, PAGE_SIZE, setPage);

              return prevState.concat(newData);
            });
          }}
          keyExtractor={(item, index) => `${item.county}-${index}`}
          renderItem={({ item }) => (
            <PopupSliderData
              cases={item.cases}
              country={item.country}
              county={item.county}
              deaths={item.deaths}
              hasTimelineSequence={item.hasTimelineSequence}
              population={item.population}
              provinces={item.provinces}
              recovered={item.recovered}
              state={item.state}
              updatedAt={item.updatedAt}
            />
          )}
        />
      )}
    </BottomSheetModal>
  );
};

export default PopupSlider;
