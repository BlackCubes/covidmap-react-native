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
import {
  useGetCountryHistoricalQuery,
  useGetProvinceHistoricalQuery,
} from "../../api/covidApi";
import { ErrorModal } from "../../commons/components/ErrorModal";
import FloatingSearchButton from "../../commons/components/FloatingSearchButton/FloatingSearchButton";
import { PreviousRegionButton } from "../../commons/components/PreviousRegionButton";
import { centroidRegion } from "../../utils";

const fadeInSearchBar = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

const WorldSearchMapLayout = () => {
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
  const [sliderHeader, setSliderHeader] = useState("Country/Province Data");

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  // This is to dynamically change the placeholder for the searchbar:
  const [searchPlaceholder, setSearchPlaceholder] =
    useState("Search by country");
  const [prevPlaceholder, setPrevPlaceholder] = useState("");

  // These are for storing the user's search inputs so that it could be inserted into
  // the Redux Toolkit query hooks:
  // -- for searching by country:
  const [searchCountry, setSearchCountry] = useState("");
  // -- for searching by province:
  const [searchProvince, setSearchProvince] = useState("");

  const {
    data: countryHistoricalData,
    isFetching: countryHistoricalFetching,
    isSuccess: countryHistoricalSuccess,
    error: countryHistoricalError,
    refetch: refetchCountryHistorical,
  } = useGetCountryHistoricalQuery(searchCountry);
  const {
    data: provinceHistoricalData,
    isFetching: provinceHistoricalFetching,
    isSuccess: provinceHistoricalSuccess,
    error: provinceHistoricalError,
    refetch: refetchProvinceHistorical,
  } = useGetProvinceHistoricalQuery({
    country: searchCountry,
    province: searchProvince,
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: 36.778259,
    longitude: -119.417931,
    latitudeDelta: 11.0922,
    longitudeDelta: 11.0421,
  });
  const [prevRegion, setPrevRegion] = useState({
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

  const handleSearchSubmit = (searchInput) => {
    const inputValue = searchInput.trim();
    // There must be a input longer than 0 characters.
    if (inputValue.length) {
      // If there are no inputs for this, then it is the initial start which is searching by country first before province.
      if (!searchCountry.length && !searchProvince.length) {
        // Refetch the Country.
        refetchCountryHistorical();

        setSearchCountry(inputValue);

        // If the country has been selected, then the first if-conditional does not pass which means the country has been selected.
      } else {
        // Refetch the Province.
        refetchProvinceHistorical();

        setSearchProvince(inputValue);
      }
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
    if (searchCountry.length && !countryHistoricalFetching) {
      // After the fetch, check to see first if there are errors from the API.
      if (countryHistoricalError) {
        setDataError({
          error: true,
          message: countryHistoricalError.data.message,
        });

        // Reset the searchCountry to an empty string. This is the case if the user entered
        // the wrong name of the Country.
        setSearchCountry("");

        // Check to see if the API call was a success.
      } else if (countryHistoricalSuccess) {
        // Get the centered region.
        const centeredRegion = centroidRegion(
          "countries",
          searchCountry,
          mapRegion,
          mapviewWidth,
          mapviewHeight
        );

        // Update the placeholder and store the previous placeholder in case the user
        // reverts back to selecting a Country.
        setPrevPlaceholder(searchPlaceholder);
        setSearchPlaceholder("Search by province");

        // Set the centered region.
        setMapRegion(centeredRegion);
        setPrevRegion(centeredRegion);

        // Update the slider data to be displayed.
        setSliderData(countryHistoricalData);

        // Update the slider header to display the user's selected Country.
        setSliderHeader(`${searchCountry} Data`);
      }
    }
  }, [
    searchCountry,
    countryHistoricalError,
    countryHistoricalFetching,
    countryHistoricalSuccess,
  ]);

  // To render to the slider if user entered a province.
  useEffect(() => {
    if (searchProvince.length && !provinceHistoricalFetching) {
      if (provinceHistoricalError) {
        setDataError({
          error: true,
          message: provinceHistoricalError.data.message,
        });

        setSearchProvince("");
      } else if (provinceHistoricalSuccess) {
        setMapRegion(
          centroidRegion(
            "provinces",
            searchProvince,
            mapRegion,
            mapviewWidth,
            mapviewHeight
          )
        );

        setSliderData(provinceHistoricalData);

        setSliderHeader(`${searchProvince} Data`);
      }
    }
  }, [
    searchProvince,
    provinceHistoricalError,
    provinceHistoricalFetching,
    provinceHistoricalSuccess,
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
          dataLoading={
            countryHistoricalFetching || provinceHistoricalFetching || false
          }
          handleSearchSubmit={handleSearchSubmit}
          searchPlaceholder={searchPlaceholder}
          opacityLevel={fadeAnim}
          handlePresentModalPress={handlePresentModalPress}
        />
      ) : (
        <></>
      )}

      {!countryHistoricalFetching &&
        !provinceHistoricalFetching &&
        searchCountry.length > 0 &&
        !dataError.error && (
          <PreviousRegionButton
            previousMapRegion={prevRegion}
            previousRegionTitle="country"
            previousSearchPlaceholder={prevPlaceholder}
            searchLandmass={searchCountry}
            searchSubLandmass={searchProvince}
            setMapRegion={setMapRegion}
            setSearchLandmass={setSearchCountry}
            setSearchPlaceholder={setSearchPlaceholder}
            setSearchSubLandmass={setSearchProvince}
          />
        )}

      {countryHistoricalFetching ? null : provinceHistoricalFetching ? null : !sliderData ? null : !sliderButton ? null : (
        <PopupSliderButton
          handlePresentModalPress={handlePresentModalPress}
          setSliderButton={setSliderButton}
        />
      )}

      <BottomSheetModalProvider>
        {!countryHistoricalFetching &&
          !provinceHistoricalFetching &&
          !dataError.error &&
          sliderData && (
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

export default WorldSearchMapLayout;
