import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, useWindowDimensions } from "react-native";
import * as Location from "expo-location";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { PopupSlider, PopupSliderButton } from "./components/popup-slider";
import MapComponent from "../map/Map";
import { useGetTotalPeopleVaccinatedByStatesQuery } from "../../api/covidApi";

const VaccineUSViewMapLayout = () => {
  const {
    data: statesVaccinatedData,
    error: statesVaccinatedError,
    isFetching: statesVaccinatedFetching,
    isSuccess: statesVaccinatedSuccess,
  } = useGetTotalPeopleVaccinatedByStatesQuery();

  const [useLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [sliderData, setSliderData] = useState(null);

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  const sliderHeader = "World Vaccinated Data";
  const mapRegion = {
    latitude: 36.778259,
    longitude: -119.417931,
    latitudeDelta: 11.0922,
    longitudeDelta: 11.0421,
  };

  /*
     Hook for storing alert content rendered in Searchbar; need to invoke setter function with one of these arguments: 
      
     1. countryHistoricalData.province
     2. usCountiesData.map(countyObj=>countyObj.county) 

     Need to pass setter function to sub-apps' useEffects and 'searchOptionsAlertMessage' to Searchbar
  */
  const [searchOptionsAlertMessage, setSearchOptionsAlertMessage] = useState(
    []
  );

  // -------Handles the modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // ---------Bottom Sheet Modal useRef and useMemo
  const bottomSheetModalRef = useRef(null);
  // State to handle the opening/closing of the Slider
  const [sliderButton, setSliderButton] = useState(false);

  // Since it is null initially before it finishes the fetch.
  useEffect(() => {
    if (statesVaccinatedData) setSliderData(statesVaccinatedData);
  }, [statesVaccinatedData]);

  // To open the slider once data has been loaded
  useEffect(() => {
    if (sliderData) handlePresentModalPress();
  }, [sliderData]);

  // Ask permission to obtain user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  /* 
    Location JSON structure is different for iOS and Android.
    iOS: currentLocation 
    Android: currentLocatoin.coords
  */
  let currentLocation = "Waiting..";
  if (errorMsg) {
    currentLocation = errorMsg;
  } else if (userLocation) {
    currentLocation = JSON.stringify(userLocation);
  }

  return (
    <>
      {sliderData && sliderButton && (
        <PopupSliderButton
          handlePresentModalPress={handlePresentModalPress}
          setSliderButton={setSliderButton}
        />
      )}

      <BottomSheetModalProvider>
        <PopupSlider
          setSliderButton={setSliderButton}
          sliderData={sliderData}
          sliderHeader={sliderHeader}
          bottomSheetModalRef={bottomSheetModalRef}
        />

        <Pressable onPressOut={Keyboard.dismiss}>
          <MapComponent
            mapviewHeight={mapviewHeight}
            mapviewRegion={mapRegion}
            mapviewWidth={mapviewWidth}
            userLocation={userLocation}
          />
        </Pressable>
      </BottomSheetModalProvider>
    </>
  );
};

export default VaccineUSViewMapLayout;
