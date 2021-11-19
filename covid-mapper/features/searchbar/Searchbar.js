import React, { useState } from "react";
import { Pressable, Animated, StyleSheet, Keyboard, Alert } from "react-native";
import styled from "styled-components/native";
import { capitalize } from "../../utils";
import Spinner from "../../commons/components/Spinner/Spinner";

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
  border-radius: 50px;
`;

const SearchbarSpinnerLoading = styled.View`
  position: absolute;
  right: 5%;
`;

const Searchbar = ({
  handleSearchSubmit,
  searchPlaceholder,
  opacityLevel,
  handlePresentModalPress,
  dataLoading,
  searchOptionsAlertMessage,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchIconPressedIn, setIsSearchIconPressedIn] = useState(false);

  // For later use: if searchOptions doesn't contain search input, render Alert

  // Returns boolean for conditionally rendering Alert in Searchbar
  let validSearchInput;
  // if(searchOptionsAlertMessage.length>0){
  //   validSearchInput = searchOptionsAlertMessage.some(region=>region===searchInput.toLowerCase())
  // }

  // const CreateSearchOptionsAlert = ()=>Alert.alert( "What you could search for: \n\n",
  // `${searchOptionsAlertMessage.map(region=><Text>{capitalize(region)+',\n'}</Text>)}`,
  // [
  //   {
  //     text: "Cancel",
  //   },
  // ])

  if (validSearchInput) {
    CreateSearchOptionsAlert();
  }

  return (
    <Animated.View
      style={[
        styles.searchBarWrapper,
        { opacity: opacityLevel, position: "absolute", top: "3%" },
      ]}
    >
      <SearchbarIconWrapper>
        <Pressable
          onPressIn={() => setIsSearchIconPressedIn(true)}
          onPressOut={() => setIsSearchIconPressedIn(false)}
          onPress={() => {
            // If the data is being fetched, don't let them submit anything.
            if (!dataLoading) {
              handleSearchSubmit(searchInput);
              setSearchInput("");
              handlePresentModalPress();
              Keyboard.dismiss();
            }
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
          // If the data is being fetched, don't let them submit anything.
          if (!dataLoading) {
            handleSearchSubmit(searchInput);
            handlePresentModalPress();
            setSearchInput("");
          }
        }}
      />

      {dataLoading && (
        <SearchbarSpinnerLoading>
          <Spinner />
        </SearchbarSpinnerLoading>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchBarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "7%",
    left: "20%",
    width: "60%",
    height: 50,
    backgroundColor: "#fbfbfc",
    borderWidth: 1,
    borderColor: "#f0f0f3",
    borderRadius: 50,
    zIndex: 10,
  },
});

export default Searchbar;
