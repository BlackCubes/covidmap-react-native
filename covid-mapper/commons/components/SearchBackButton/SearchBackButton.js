import React from "react";
import { Pressable } from "react-native";

import { SearchBackTitle, SearchBackWrapper } from "./styles";

const SearchBackButton = () => {
  return (
    <Pressable
      style={{
        position: "absolute",
        top: "17%",
        left: "10%",
        zIndex: 10,
      }}
      onPress={() => console.log("in search back button!")}
    >
      <SearchBackWrapper>
        <SearchBackTitle>Country</SearchBackTitle>
      </SearchBackWrapper>
    </Pressable>
  );
};

export default SearchBackButton;
