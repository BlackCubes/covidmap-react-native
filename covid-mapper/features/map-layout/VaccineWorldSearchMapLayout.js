import React, { useEffect, useState, useRef, useCallback } from "react";
import * as Location from "expo-location";
import {
  useWindowDimensions,
  Animated,
  Pressable,
  Keyboard,
} from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  PopupSlider,
  PopupSliderButton,
  PopupSliderObject,
} from "./components/popup-slider";
import MapComponent from "../map/Map";
import Searchbar from "../searchbar/Searchbar";
import { useGetTotalPeopleVaccinatedByCountryQuery } from "../../api/covidApi";
import { ErrorModal } from "../../commons/components/ErrorModal";
import FloatingSearchButton from "../../commons/components/FloatingSearchButton/FloatingSearchButton";
import { centroidRegion } from "../../utils";

const fadeInSearchBar = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

const VaccineWorldSearchMapLayout = () => {
  // Searchbar animation
  const [searchBarActive, setSearchBarActive] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [sliderData, setSliderData] = useState(null);
  const [dataError, setDataError] = useState({
    error: false,
    message: "",
  });
  const [sliderHeader, setSliderHeader] = useState("Country Vaccinated Data");

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  // Set the placeholder for the searchbar:
  const searchPlaceholder = "Search by country";

  // These are for storing the user's search inputs so that it could be inserted into
  // the Redux Toolkit query hooks:
  // -- for searching by country:
  const [searchCountry, setSearchCountry] = useState("");

  const {
    data: vaccinatedCountryData,
    isFetching: vaccinatedCountryFetching,
    isSuccess: vaccinatedCountrySuccess,
    error: vaccinatedCountryError,
    refetch: refetchVaccinatedCountry,
  } = useGetTotalPeopleVaccinatedByCountryQuery(searchCountry);

  const [mapRegion, setMapRegion] = useState({
    latitude: 36.778259,
    longitude: -119.417931,
    latitudeDelta: 11.0922,
    longitudeDelta: 11.0421,
  });



  // -------Handles the modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // ---------Bottom Sheet Modal useRef and useMemo
  const bottomSheetModalRef = useRef(null);
  // State to handle the opening/closing of the Slider
  const [sliderButton, setSliderButton] = useState(true);

  const handleSearchSubmit = (inputValue) => {
    // There must be a input longer than 0 characters.
    if (inputValue.length) {
      // Refetch the Country.
      refetchVaccinatedCountry();

      setSearchCountry(inputValue);
    }
  };

  // Ask permission to obtain user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        setUserLocation(mapRegion);
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

  // To render to the slider if user entered a country.
  useEffect(() => {
    // First check if the user has entered a Country and if the data is not being fetched.
    if (searchCountry.length && !vaccinatedCountryFetching) {
      // After the fetch, check to see first if there are errors from the API.
      if (vaccinatedCountryError) {
        setDataError({
          error: true,
          message: vaccinatedCountryError.data.message,
        });

        // Reset the searchCountry to an empty string. This is the case if the user entered
        // the wrong name of the Country.
        setSearchCountry("");

        // Check to see if the API call was a success.
      } else if (vaccinatedCountrySuccess) {
        // Get the centered region.
        const centeredRegion = centroidRegion(
          "countries",
          searchCountry,
          mapRegion,
          mapviewWidth,
          mapviewHeight
        );

        // Set the centered region.
        setMapRegion(centeredRegion);

        // Update the slider data to be displayed.
        setSliderData(vaccinatedCountryData);

        // Update the slider header to display the user's selected Country.
        setSliderHeader(`${searchCountry} Data`);
      }
    }
  }, [
    searchCountry,
    vaccinatedCountryError,
    vaccinatedCountryFetching,
    vaccinatedCountrySuccess,
  ]);

  return (
    <>
      {dataError.error && (
        <ErrorModal
          errorMsg={dataError.message}
          errorStatus={dataError.error}
          setDataError={setDataError}
        />
      )}

      <FloatingSearchButton
        pressHandler={() => {
          setSearchBarActive(!searchBarActive);
          fadeInSearchBar(fadeAnim);
        }}
      ></FloatingSearchButton>
      {searchBarActive ? (
        <Searchbar
          handleSearchSubmit={handleSearchSubmit}
          searchPlaceholder={searchPlaceholder}
          opacityLevel={fadeAnim}
          handlePresentModalPress={handlePresentModalPress}
        />
      ) : (
        <></>
      )}

      {!sliderData ? null : !sliderButton ? null : (
        <PopupSliderButton
          handlePresentModalPress={handlePresentModalPress}
          setSliderButton={setSliderButton}
        />
      )}

      <BottomSheetModalProvider>
        {!dataError.error && sliderData && (
          <PopupSlider
            bottomSheetModalRef={bottomSheetModalRef}
            setSliderButton={setSliderButton}
            sliderData={sliderData}
            sliderHeader={sliderHeader}
            SliderStructureComponent={PopupSliderObject}
          />
        )}

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

export default VaccineWorldSearchMapLayout;
