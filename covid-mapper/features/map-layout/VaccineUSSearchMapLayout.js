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
import { useGetTotalPeopleVaccinatedByStateQuery } from "../../api/covidApi";
import { ErrorModal } from "../../commons/components/ErrorModal";
import FloatingSearchButton from "../../commons/components/FloatingSearchButton/FloatingSearchButton";
import { centroidRegion } from "../../utils";
import coordinates from "../../utils/coordinates.json";

const fadeInSearchBar = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

const VaccineUSSearchMapLayout = () => {
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
  const [sliderHeader, setSliderHeader] = useState(
    "State in US Vaccinated Data"
  );

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  // Set the placeholder for the searchbar:
  const searchPlaceholder = "Search by state";

  // These are for storing the user's search inputs so that it could be inserted into
  // the Redux Toolkit query hooks:
  // -- for searching by state:
  const [searchState, setSearchState] = useState("");

  const {
    data: vaccinatedStateData,
    isFetching: vaccinatedStateFetching,
    isSuccess: vaccinatedStateSuccess,
    error: vaccinatedStateError,
    refetch: refetchVaccinatedState,
  } = useGetTotalPeopleVaccinatedByStateQuery(searchState);

  const initialLatitude = parseFloat(
    coordinates.countries.usa.centroid.latitude
  );
  const initialLongitude = parseFloat(
    coordinates.countries.usa.centroid.longitude
  );
  const initialLatitudeDelta =
    parseFloat(coordinates.countries.usa.bounding_box.north_east.latitude) -
    parseFloat(coordinates.countries.usa.bounding_box.south_west.latitude);
  const initialLongitudeDelta =
    parseFloat(coordinates.countries.usa.bounding_box.north_east.latitude) -
    (parseFloat(coordinates.countries.usa.bounding_box.south_west.latitude) *
      mapviewWidth) /
      mapviewHeight;

  const [mapRegion, setMapRegion] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: initialLatitudeDelta,
    longitudeDelta: initialLongitudeDelta,
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
      // Refetch the State.
      refetchVaccinatedState();

      setSearchState(inputValue);
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
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
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

  // To render to the slider if user entered a State.
  useEffect(() => {
    // First check if the user has entered a State and if the data is not being fetched.
    if (searchState.length && !vaccinatedStateFetching) {
      // After the fetch, check to see first if there are errors from the API.
      if (vaccinatedStateError) {
        setDataError({
          error: true,
          message: vaccinatedStateError.data.message,
        });

        // Reset the searchState to an empty string. This is the case if the user entered
        // the wrong name of the State.
        setSearchState("");

        // Check to see if the API call was a success.
      } else if (vaccinatedStateSuccess) {
        // Get the centered region.
        const centeredRegion = centroidRegion(
          "united_states",
          searchState,
          mapRegion,
          mapviewWidth,
          mapviewHeight
        );

        // Set the centered region.
        setMapRegion(centeredRegion);

        // Update the slider data to be displayed.
        setSliderData(vaccinatedStateData);

        // Update the slider header to display the user's selected State.
        setSliderHeader(`${searchState} Vaccinated Data`);
      }
    }
  }, [
    searchState,
    vaccinatedStateError,
    vaccinatedStateFetching,
    vaccinatedStateSuccess,
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

export default VaccineUSSearchMapLayout;
