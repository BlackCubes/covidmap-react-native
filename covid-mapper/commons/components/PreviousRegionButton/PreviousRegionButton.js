import React from "react";
import { Pressable } from "react-native";

import { SearchBackTitle, SearchBackWrapper } from "./styles";

const SearchBackButton = ({
  previousMapRegion,
  previousSearchPlaceholder,
  searchBackBtnTitle,
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
        top: "17%",
        left: "10%",
        zIndex: 10,
      }}
      onPress={handleOnPress}
    >
      <SearchBackWrapper>
        <SearchBackTitle>Search {searchBackBtnTitle}</SearchBackTitle>
      </SearchBackWrapper>
    </Pressable>
  );
};

export default SearchBackButton;
