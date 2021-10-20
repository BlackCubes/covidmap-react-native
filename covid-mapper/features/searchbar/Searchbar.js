import React, { useState } from "react";
import styled from "styled-components/native";

const SearchbarWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 7%;
  left: 20%;
  width: 60%;
  height: 50px;
  background-color: #fbfbfc;
  border: 1px solid #f0f0f3;
  border-radius: 50px;
  z-index: 10;
`;

const SearchbarIconWrapper = styled.View`
  position: absolute;
  left: 5%;
  width: 35px;
  height: 35px;
  z-index: 100;
`;

const SearchbarIcon = styled.Image`
  width: 100%;
  height: 100%;
  opacity: ${({ isFocus }) => (isFocus ? "0.5" : "1")};
`;

const SearchbarInput = styled.TextInput`
  font-size: 16px;
  width: 95%;
  height: 84%;
  padding-right: 10px;
  padding-left: 39px;
  background-color: ${({ isFocus }) => (isFocus ? "#e2e2e8" : "#fbfbfc")};
  border: ${({ isFocus }) => (isFocus ? "1px solid #c6c6d1" : "none")};
  border-radius: 50px;
`;

const Searchbar = ({ handleSearchSubmit, searchPlaceholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SearchbarWrapper>
      <SearchbarIconWrapper>
        <SearchbarIcon
          isFocus={isFocus}
          source={require("../../assets/search-icon.png")}
        />
      </SearchbarIconWrapper>

      <SearchbarInput
        defaultValue=""
        value={searchInput}
        placeholder={searchPlaceholder}
        isFocus={isFocus}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(!searchInput.length ? false : true)}
        onChangeText={(text) => setSearchInput(text)}
        onSubmitEditing={() => {
          handleSearchSubmit(searchInput);
          setSearchInput("");
        }}
      />
    </SearchbarWrapper>
  );
};

export default Searchbar;
