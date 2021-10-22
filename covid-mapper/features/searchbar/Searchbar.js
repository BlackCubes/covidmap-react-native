import React, { useState } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";
import styled from "styled-components/native";


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
  opacity: ${({ isFocus, isSearchIconPressedIn }) =>
    isSearchIconPressedIn ? "1" : isFocus ? "0.5" : "1"};
`;

const SearchbarInput = styled.TextInput`
  font-size: 14px;
  width: 95%;
  height: 84%;
  padding-right: 10px;
  padding-left: 39px;
  background-color: ${({ isFocus }) => (isFocus ? "#e2e2e8" : "#fbfbfc")};
  border: ${({ isFocus }) => (isFocus ? "1px solid #c6c6d1" : "none")};
  border-radius: 50px;
`;

const Searchbar = ({ handleSearchSubmit, searchPlaceholder, opacityLevel }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchIconPressedIn, setIsSearchIconPressedIn] = useState(false);

  return (
    <Animated.View style={[styles.searchBarWrapper, {opacity: opacityLevel}]}>
        <SearchbarIconWrapper>
          <Pressable
            onPressIn={() => setIsSearchIconPressedIn(true)}
            onPressOut={() => setIsSearchIconPressedIn(false)}
            onPress={() => {
              handleSearchSubmit(searchInput);
              setSearchInput("");
            }}
          >
            <SearchbarIcon
              isFocus={isFocus}
              isSearchIconPressedIn={isSearchIconPressedIn}
              source={require("../../assets/search-icon.png")}
            />
          </Pressable>
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
    </Animated.View>
  );
};

const styles=StyleSheet.create({
  searchBarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '7%',
    left: '20%',
    width: '60%',
    height: 50,
    backgroundColor: '#fbfbfc',
    borderWidth: 1,
    borderColor: "#f0f0f3",
    borderRadius: 50,
    zIndex: 10,
  }
})

export default Searchbar;
