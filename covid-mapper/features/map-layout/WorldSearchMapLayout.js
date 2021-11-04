import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import * as Location from "expo-location";
import {
  useWindowDimensions,
  Animated,
  Pressable,
  Keyboard,
} from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { PopupSlider, PopupSliderButton } from "./components/popup-slider";
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
  const [sliderDataLoading, setSliderDataLoading] = useState(null);
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
    isLoading: countryHistoricalLoading,
    error: countryHistoricalError,
    refetch: refetchCountryHistorical,
  } = useGetCountryHistoricalQuery(searchCountry);
  const {
    data: provinceHistoricalData,
    isLoading: provinceHistoricalLoading,
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
  const [sliderButton, setSliderButton] = useState(true);

  const handleSearchSubmit = (inputValue) => {
    // There must be a input longer than 0 characters.
    if (inputValue.length) {
      // If there are no inputs for this, then it is the initial start which is searching by country first before province.
      if (!searchCountry.length && !searchProvince.length) {
        setSearchCountry(inputValue);
        setPrevPlaceholder(searchPlaceholder);
        setSearchPlaceholder("Search by province");
        // If the country has been selected, then the first if-conditional does not pass which means the country has been selected.
      } else {
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
    if (searchCountry.length && countryHistoricalData) {
      const centeredRegion = centroidRegion(
        "countries",
        searchCountry,
        mapRegion,
        mapviewWidth,
        mapviewHeight
      );

      setMapRegion(centeredRegion);
      setPrevRegion(centeredRegion);

      setSliderData(countryHistoricalData);
      setSliderDataLoading(countryHistoricalLoading);

      setSliderHeader(`${searchCountry} Data`);

      refetchCountryHistorical();
    }
  }, [searchCountry, countryHistoricalData]);

  useEffect(() => {
    if (searchCountry.length && countryHistoricalError)
      setDataError({
        error: true,
        message: countryHistoricalError.data.message,
      });
    else
      setDataError({
        error: false,
        message: "",
      });
  }, [searchCountry, countryHistoricalError]);

  // To render to the slider if user entered a province.
  useEffect(() => {
    if (searchProvince.length && provinceHistoricalData) {
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
      setSliderDataLoading(provinceHistoricalLoading);

      setSliderHeader(`${searchProvince} Data`);

      refetchProvinceHistorical();
    }
  }, [searchProvince, provinceHistoricalData]);

  useEffect(() => {
    if (!countryHistoricalError) {
      if (searchProvince.length && provinceHistoricalError)
        setDataError({
          error: true,
          message: provinceHistoricalError.data.message,
        });
      else
        setDataError({
          error: false,
          message: "",
        });
    }
  }, [countryHistoricalError, searchProvince, provinceHistoricalError]);

  return (
    <>
      {dataError.error && (
        <ErrorModal
          errorMsg={dataError.message}
          errorStatus={dataError.error}
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

      {!searchCountry.length > 0 ? null : (
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

      {!sliderData ? null : !sliderButton ? null : (
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

export default WorldSearchMapLayout;
