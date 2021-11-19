import React from "react";
import { Pressable } from "react-native";

import { PreviousRegionTitle, PreviousRegionWrapper } from "./styles";

const PreviousRegionButton = ({
  previousMapRegion,
  previousRegionTitle,
  previousSearchPlaceholder,
  searchLandmass,
  searchSubLandmass,
  setMapRegion,
  setSearchLandmass,
  setSearchPlaceholder,
  setSearchSubLandmass,
}) => {
  const handleOnPress = () => {
    if (searchLandmass.length) setSearchLandmass("");

    if (searchSubLandmass.length) setSearchSubLandmass("");

    if (searchSubLandmass.length) setMapRegion(previousMapRegion);

    setSearchPlaceholder(previousSearchPlaceholder);
  };

  return (
    <Pressable
      style={{
        position: "absolute",
        top: "12%",
        left: "10%",
        zIndex: 10,
      }}
      onPress={handleOnPress}
    >
      <PreviousRegionWrapper>
        <PreviousRegionTitle>
          Search by {previousRegionTitle}
        </PreviousRegionTitle>
      </PreviousRegionWrapper>
    </Pressable>
  );
};

export default PreviousRegionButton;
