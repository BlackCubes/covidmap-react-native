import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import * as Location from "expo-location";
import { useWindowDimensions, Pressable, Keyboard } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  PopupSlider,
  PopupSliderButton,
  PopupSliderObject,
} from "./components/popup-slider";
import MapComponent from "../map/Map";
import { useGetGlobalCovidStatsQuery } from "../../api/covidApi";
import { ErrorModal } from "./../../commons/components/ErrorModal";

const WorldMapLayout = () => {
  const { data: globalCovidStatsData, error: globalCovidStatsError } =
    useGetGlobalCovidStatsQuery();

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [sliderData, setSliderData] = useState(null);
  const [dataError, setDataError] = useState({
    error: false,
    message: "",
  });

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

  const sliderHeader = "World Data";
  const mapRegion = {
    latitude: 36.778259,
    longitude: -119.417931,
    latitudeDelta: 11.0922,
    longitudeDelta: 11.0421,
  };



  // -------Handles the modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // ---------Bottom Sheet Modal useRef and useMemo
  const bottomSheetModalRef = useRef(null);
  // State to handle the opening/closing of the Slider
  const [sliderButton, setSliderButton] = useState(false);

  // Since it is null initially when the app first starts.
  useEffect(() => {
    if (globalCovidStatsData) {
      setSliderData(globalCovidStatsData);
    }
  }, [globalCovidStatsData]);

  useEffect(() => {
    if (globalCovidStatsError)
      setDataError({
        error: true,
        message: globalCovidStatsError.data.message,
      });
    else
      setDataError({
        error: false,
        message: "",
      });
  }, [globalCovidStatsError]);

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
          SliderStructureComponent={PopupSliderObject}
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

export default WorldMapLayout;
