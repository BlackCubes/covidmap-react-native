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
import { useGetAllUSCountiesFromStateQuery } from "../../api/covidApi";
import { ErrorModal } from "../../commons/components/ErrorModal";
import FloatingSearchButton from "../../commons/components/FloatingSearchButton/FloatingSearchButton";
import { PreviousRegionButton } from "../../commons/components/PreviousRegionButton";
import { centroidRegion, retrieveCountyData } from "../../utils";

const fadeInSearchBar = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

const USSearchMapLayout = () => {
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

  const [sliderHeader, setSliderHeader] = useState("World Data");

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  // This is to dynamically change the placeholder for the searchbar:
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search by state");
  const [prevPlaceholder, setPrevPlaceholder] = useState("");

  // These are for storing the user's search inputs so that it could be inserted into
  // the Redux Toolkit query hooks:
  // -- for searching by US State:
  const [searchUSState, setSearchUSState] = useState("");
  // -- for searching by US County in State (this would not be used in the query hooks,
  // but to extract the array of data)
  const [searchUSCounty, setSearchUSCounty] = useState("");

  const {
    data: usCountiesData,
    isLoading: usCountiesLoading,
    isFetching: usCountiesFetching,
    isSuccess: usCountiesSuccess,
    error: usCountiesError,
    refetch: refetchUSCounties,
  } = useGetAllUSCountiesFromStateQuery(searchUSState);

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
    // If there are no inputs for this, then it is the initial start.
    if (!searchUSState.length && !searchUSCounty.length) {
      refetchUSCounties();
      setSearchUSState(inputValue);
      // setPrevPlaceholder(searchPlaceholder);
      // setSearchPlaceholder("Search by county");
    } else {
      setSearchUSCounty(inputValue);
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

  // To render to the slider if the user entered a US State.
  useEffect(() => {
    if (searchUSState.length && !usCountiesFetching) {
      if (usCountiesError) {
        setDataError({
          error: true,
          message: usCountiesError.data.message,
        });

        setSearchUSState("");
        // refetchUSCounties();
      } else if (usCountiesSuccess) {
        const centeredRegion = centroidRegion(
          "united_states",
          searchUSState,
          mapRegion,
          mapviewWidth,
          mapviewHeight
        );

        setPrevPlaceholder(searchPlaceholder);
        setSearchPlaceholder("Search by county");

        setMapRegion(centeredRegion);
        setPrevRegion(centeredRegion);

        setSliderData(usCountiesData);
        setSliderDataLoading(usCountiesLoading);

        setSliderHeader(`${searchUSState} Data`);

        // refetchUSCounties();
      }
    }
  }, [searchUSState, usCountiesError, usCountiesFetching, usCountiesSuccess]);

  // useEffect(() => {
  //   if (searchUSState.length && usCountiesError)
  //     setDataError({
  //       error: true,
  //       message: usCountiesError.data.message,
  //     });
  //   else
  //     setDataError({
  //       error: false,
  //       message: "",
  //     });
  // }, [searchUSState, usCountiesError]);

  // To render to the slider if the user entered a US County.
  useEffect(() => {
    if (searchUSCounty.length && usCountiesData) {
      const selectedCountyData = retrieveCountyData(
        searchUSCounty,
        usCountiesData
      );

      if (!selectedCountyData) {
        setDataError({
          error: true,
          message: "County not found or doesn't have any historical data",
        });
      } else {
        setSliderData(selectedCountyData);
        setSliderDataLoading(usCountiesLoading);

        setSliderHeader(`${searchUSCounty} Data`);
      }
    }
  }, [searchUSCounty, usCountiesData]);

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

      {searchUSState.length > 0 && !dataError.error && (
        <PreviousRegionButton
          previousMapRegion={prevRegion}
          previousRegionTitle="state"
          previousSearchPlaceholder={prevPlaceholder}
          searchLandmass={searchUSState}
          searchSubLandmass={searchUSCounty}
          setMapRegion={setMapRegion}
          setSearchLandmass={setSearchUSState}
          setSearchPlaceholder={setSearchPlaceholder}
          setSearchSubLandmass={setSearchUSCounty}
        />
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
            setSliderButton={setSliderButton}
            sliderData={sliderData}
            sliderHeader={sliderHeader}
            bottomSheetModalRef={bottomSheetModalRef}
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

export default USSearchMapLayout;
