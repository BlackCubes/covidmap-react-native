import React from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import PopupSliderData from "./PopupSliderData";

const PopupSliderObject = ({ sliderData }) => (
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
      hasVaccines={sliderData.hasVaccines}
    />
  </BottomSheetScrollView>
);

export default PopupSliderObject;
