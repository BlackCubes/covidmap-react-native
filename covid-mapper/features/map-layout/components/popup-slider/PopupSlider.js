import React, { useMemo } from "react";
import styled from "styled-components/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { capitalize } from "../../../../utils";

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

const PopupSlider = ({
  bottomSheetModalRef,
  setSliderButton,
  sliderData,
  sliderHeader,
  SliderStructureComponent,
}) => {
  // This is the starting and ending height of the Slider.
  const snapPoints = useMemo(() => ["7%", "82%"], []);

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

      <SliderStructureComponent sliderData={sliderData} />
    </BottomSheetModal>
  );
};

export default PopupSlider;
