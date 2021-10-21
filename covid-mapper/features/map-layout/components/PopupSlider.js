import React, { useState, useCallback, useMemo, useRef } from "react";
import styled from "styled-components/native";
import {
  useGetCountryHistoricalQuery,
  useGetProvinceHistoricalQuery,
} from "../../../api/covidApi";
import { FlatList, Text, Button, View, StyleSheet } from "react-native";
import Spinner from "../../../commons/components/Spinner/Spinner";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const PopupContainer = styled.View`
  width: 100%;
  height: 250px;
  background-color: #273440;
  color: white;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const PopupDivider = styled.View`
  width: 70px;
  height: 3px;
  background-color: #fff;
  border-radius: 2px;
`;

const PopUpTitle = styled.Text`
  font-size: 20px;
  color: white;
  margin: 20px 120px 10px 0;
`;

const PopupContentContainer = styled.View`
  justify-content: flex-start;
`;

const PopupContent = styled.Text`
  font-size: 15px;
  color: white;
`;

const PopupButtonTest = styled.Button`
  margin-top: 0;
  position: absolute;
  bottom: 0;
`;

const HeaderStyleTest = styled.View`
  margin-top: 0;
  border: 1px solid blue;
`;

const PopupSlider = ({ searchCountry, searchProvince }) => {
  const {
    data: countryData,
    isLoading,
    error,
  } = useGetCountryHistoricalQuery(searchCountry);

  // const { data: provinceData } = useGetProvinceHistoricalQuery(searchProvince);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (error) {
    return (
      <PopupContainer>
        <PopupDivider />
        <Text>Error: {error}</Text>
      </PopupContainer>
    );
  }

  if (isLoading || !countryData)
    return (
      <PopupContainer>
        <PopupDivider />
        <Spinner />
      </PopupContainer>
    );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
      {/* <PopupButtonTest
        onPress={handlePresentModalPress}
        title={"show slider"}
        color="black"
      />
      <PopupContainer>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <FlatList
            data={countryData}
            initialNumToRender={4}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <>
                <PopUpTitle>Lates from: {item.country}</PopUpTitle>
                <PopupContentContainer>
                  <PopupContent>
                    Location: {item.province ? item.province : item.country}
                  </PopupContent>
                  <PopupContent>Updated at: {}</PopupContent>
                  <PopupContent>Confirmed Cases: {}</PopupContent>
                  <PopupContent>Deaths: {}</PopupContent>
                  <PopupContent>Recovered: {}</PopupContent>
                </PopupContentContainer>
              </>
            )}
          />
        </BottomSheetModal>
      </PopupContainer> */}
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
    zIndex: 1000,
    position: "absolute",
    borderColor: "blue",
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    position: "absolute",
    zIndex: 1000,
    borderColor: "orange",
    borderWidth: 1
  },
});

export default PopupSlider;
