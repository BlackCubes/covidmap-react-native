import React, { useEffect, useState, useRef, useCallback } from "react";
import * as Location from "expo-location";
import { useWindowDimensions, Pressable, Keyboard } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  PopupSliderButton,
  PopupSlider,
  PopupSliderArray,
} from "./components/popup-slider";
import MapComponent from "../map/Map";
import { useGetTotalsAllStatesUSQuery } from "../../api/covidApi";
import { ErrorModal } from "../../commons/components/ErrorModal";
import coordinates from "../../utils/coordinates.json";

const USViewMapLayout = () => {
  const { data: allUSStatesData, error: allUSStatesError } =
    useGetTotalsAllStatesUSQuery();

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [sliderData, setSliderData] = useState(null);
  const [dataError, setDataError] = useState({
    error: false,
    message: "",
  });

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  const sliderHeader = "US Total Data";

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
  const [sliderButton, setSliderButton] = useState(false);

  // To render to the slider since it is null initially when the app first starts.
  useEffect(() => {
    if (allUSStatesData) {
      setSliderData(allUSStatesData);
    }
  }, [allUSStatesData]);

  useEffect(() => {
    if (allUSStatesError)
      setDataError({
        error: true,
        message: allUSStatesError.data.message,
      });
    else
      setDataError({
        error: false,
        message: "",
      });
  }, [allUSStatesError]);

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

  return (
    <>
      {dataError.error && (
        <ErrorModal
          errorMsg={dataError.message}
          errorStatus={dataError.error}
          setDataError={setDataError}
        />
      )}

      {sliderData && sliderButton && (
        <PopupSliderButton
          handlePresentModalPress={handlePresentModalPress}
          setSliderButton={setSliderButton}
        />
      )}

      <BottomSheetModalProvider>
        <PopupSlider
          bottomSheetModalRef={bottomSheetModalRef}
          setSliderButton={setSliderButton}
          sliderData={sliderData}
          sliderHeader={sliderHeader}
          SliderStructureComponent={PopupSliderArray}
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

export default USViewMapLayout;
