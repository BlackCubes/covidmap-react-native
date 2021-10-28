import React from "react";
import { Pressable } from "react-native";

import { SearchBackTitle, SearchBackWrapper } from "./styles";

const SearchBackButton = ({
  previousMapRegion,
  previousSearchPlaceholder,
  searchBackBtnTitle,
  searchCountry,
  searchProvince,
  searchUSCounty,
  searchUSState,
  setMapRegion,
  setSearchCountry,
  setSearchPlaceholder,
  setSearchProvince,
  setSearchUSCounty,
  setSearchUSState,
}) => {
  const handleOnPress = () => {
    if (searchCountry.length) {
      setSearchCountry("");
    } else if (searchUSState.length) {
      setSearchUSState("");
    }

    if (searchProvince.length) {
      setSearchProvince("");
    } else if (searchUSCounty.length) {
      setSearchUSCounty("");
    }

    if (searchProvince.length || searchUSCounty.length) {
      setMapRegion(previousMapRegion);
    }

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
        <SearchBackTitle>{searchBackBtnTitle}</SearchBackTitle>
      </SearchBackWrapper>
    </Pressable>
  );
};

export default SearchBackButton;
