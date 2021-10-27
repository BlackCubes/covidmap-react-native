import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import * as Location from "expo-location";
import { useWindowDimensions, Animated, Pressable } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import MapComponent from "../map/Map";
import Searchbar from "../searchbar/Searchbar";
import FloatingSearchButton from "../../commons/components/FloatingSearchButton/FloatingSearchButton";
import {
  useGetGlobalCovidStatsQuery,
  useGetAllCountriesProvincesHistoricalQuery,
  useGetAllUSCountiesFromStateQuery,
  useGetCountryHistoricalQuery,
  useGetProvinceHistoricalQuery,
  useGetTotalsAllStatesUSQuery,
  useGetTotalOneUSStateQuery,
} from "../../api/covidApi";
import { OpenSesameButton } from "../../commons/components";
import PopupSlider from "./components/PopupSlider";
import { centroidRegion } from "../../utils";
import styled from "styled-components/native";

/**
 * Finds the selected county inside an array of counties inside the US State.
 * If it can't find the county, it return undefined. If it does, returns the county's
 * data as an object.
 * @param {String} county
 * @param {Array<object>} stateCounties
 * @returns {Null|object} Null or an object.
 */
const retrieveCountyData = (county, stateCounties) => {
  // If the string length is empty, return undefined.
  if (!county.length) return null;
  // Checks to see if it is undefined or null from the API.
  if (!stateCounties) return null;
  // Checks to see if there is even an array length.
  if (!stateCounties.length) return null;

  // Returns that county's data as an object, or undefined if nothing.
  const countyData = stateCounties.find((state) => state.county === county);

  // Nullish coalescing operator that checks if it is undefined. If it is undefined,
  // return null instead for better functionality checks in the future. If there is
  // data, return that data.
  return countyData ?? null;
};

const fadeInSearchBar = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

const MapLayout = ({ route }) => {
  // Searchbar animation
  const [searchBarActive, setSearchBarActive] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [sliderDataLoading, setSliderDataLoading] = useState(null);
  const [sliderDataError, setSliderDataError] = useState(null);
  const [sliderHeader, setSliderHeader] = useState("World Data");

  // This is to dynamically change the placeholder for the searchbar:
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  // These are for storing the user's search inputs so that it could be inserted into
  // the Redux Toolkit query hooks:
  // -- for searching by country:
  const [searchCountry, setSearchCountry] = useState("");
  // -- for searching by province:
  const [searchProvince, setSearchProvince] = useState("");
  // -- for searching by US State:
  const [searchUSState, setSearchUSState] = useState("");
  // -- for searching by US County in State (this would not be used in the query hooks,
  // but to extract the array of data)
  const [searchUSCounty, setSearchUSCounty] = useState("");

  const { name: routeName } = route;

  // WORLD
  // - world stats
  const {
    data: globalCovidStatsData,
    isLoading: globalCovidStatsLoading,
    error: globalCovidStatsError,
  } = useGetGlobalCovidStatsQuery();

  // - search country/province
  const {
    data: allCountriesProvincesHistoricalData,
    isLoading: allCountriesProvincesHistoricalLoading,
    error: allCountriesProvincesHistoricalError,
  } = useGetAllCountriesProvincesHistoricalQuery();
  const {
    data: countryHistoricalData,
    isLoading: countryHistoricalLoading,
    error: countryHistoricalError,
  } = useGetCountryHistoricalQuery(searchCountry);
  const {
    data: provinceHistoricalData,
    isLoading: provinceHistoricalLoading,
    error: provinceHistoricalError,
  } = useGetProvinceHistoricalQuery({
    country: searchCountry,
    province: searchProvince,
  });

  // US
  // - national stats
  const {
    data: allUSStatesData,
    isLoading: allUSStatesLoading,
    error: allUSStatesError,
  } = useGetTotalsAllStatesUSQuery();

  // - search state/county
  const {
    data: oneUSStateData,
    isLoading: oneUSStateLoading,
    error: oneUSStateError,
  } = useGetTotalOneUSStateQuery(searchUSState);
  const {
    data: usCountiesData,
    isLoading: usCountiesLoading,
    error: usCountiesError,
  } = useGetAllUSCountiesFromStateQuery(searchUSState);

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();

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
  const snapPoints = useMemo(() => ["25%", "100%"], []);

  const handleSearchSubmit = (inputValue) => {
    // Based on the name of the route to update particular states.
    if (routeName === "Country Province Stats") {
      // If there are no inputs for this, then it is the initial start.
      if (!searchCountry.length && !searchProvince.length) {
        setSearchCountry(inputValue);
        setSearchPlaceholder("Search by province");

        // This would only happen only if the user has provided a country search:
      } else {
        setSearchProvince(inputValue);
      }
    } else if (
      routeName === "US Total" ||
      routeName === "State Counties Totals"
    ) {
      if (!searchUSState.length && !searchUSCounty.length) {
        setSearchUSState(inputValue);
        setSearchPlaceholder("Search by county");
      } else {
        setSearchUSCounty(inputValue);
      }
    }
  };

  // To render to the slider since it is null initially when the app first starts.
  useEffect(() => {
    if (globalCovidStatsData) {
      setSliderData(globalCovidStatsData);
      setSliderDataLoading(globalCovidStatsLoading);
      setSliderDataError(globalCovidStatsError);
    }
  }, [globalCovidStatsData]);

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

  useEffect(() => {
    // Based on the route names to update the data array or object to be displayed on the map.
    switch (routeName) {
      case "World":
        setSearchPlaceholder("Search by world");
        setSliderHeader("World Data");
        break;
      case "Country Province Stats":
        setSliderData(allCountriesProvincesHistoricalData);
        setSliderDataLoading(allCountriesProvincesHistoricalLoading);
        setSliderDataError(allCountriesProvincesHistoricalError);

        setSearchPlaceholder("Search by country");
        setSliderHeader("Country/Province Data");
        break;
      case "US Total":
        setSliderData(allUSStatesData);
        setSliderDataLoading(allUSStatesLoading);
        setSliderDataError(allUSStatesError);

        setSearchPlaceholder("Search by US state");
        setSliderHeader("US Total Data");
        break;
      case "State Counties Totals":
        setSliderData(allUSStatesData);
        setSliderDataLoading(allUSStatesLoading);
        setSliderDataError(allUSStatesError);

        setSearchPlaceholder("Search by US state");
        setSliderHeader("US State/Counties Data");
        break;
      default:
        setSearchPlaceholder("Search by world");
        setSliderHeader("World Data");
        break;
    }
  }, [routeName]);

  // To render to the slider if user entered a country.
  useEffect(() => {
    if (searchCountry.length && countryHistoricalData) {
      setMapRegion(
        centroidRegion(
          "countries",
          searchCountry,
          mapRegion,
          mapviewWidth,
          mapviewHeight
        )
      );

      setSliderData(countryHistoricalData);
      setSliderDataError(countryHistoricalError);
      setSliderDataLoading(countryHistoricalLoading);

      setSliderHeader(`${searchCountry} Data`);
    }
  }, [searchCountry, countryHistoricalData]);

  // To render to the slider if user entered a province.
  useEffect(() => {
    if (searchProvince.length && provinceHistoricalData) {
      setSliderData(provinceHistoricalData);
      setSliderDataError(provinceHistoricalError);
      setSliderDataLoading(provinceHistoricalLoading);

      setSliderHeader(`${searchProvince} Data`);
    }
  }, [searchProvince, provinceHistoricalData]);

  // To render to the slider if the user entered a US State.
  useEffect(() => {
    if (searchUSState.length && oneUSStateData) {
      setMapRegion(
        centroidRegion(
          "united_states",
          searchUSState,
          mapRegion,
          mapviewWidth,
          mapviewHeight
        )
      );

      setSliderData(oneUSStateData);
      setSliderDataError(oneUSStateError);
      setSliderDataLoading(oneUSStateLoading);

      setSliderHeader(`${searchUSState} Data`);
    }
  }, [searchUSState, oneUSStateData]);

  // To render to the slider if the user entered a US County.
  useEffect(() => {
    if (searchUSCounty.length && usCountiesData) {
      setSliderData(retrieveCountyData(searchUSCounty, usCountiesData));
      setSliderDataError(usCountiesError);
      setSliderDataLoading(usCountiesLoading);

      setSliderHeader(`${searchUSCounty} Data`);
    }
  }, [searchUSCounty, usCountiesData]);

  return (
    <BottomSheetModalProvider
    
    style={{ color: "black", zIndex:'110' }}>
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

      <OpenSesameButton />
    
      <PopupSlider
        sliderData={sliderData}
        sliderDataLoading={sliderDataLoading}
        sliderDataError={sliderDataError}
        sliderHeader={sliderHeader}
        handlePresentModalPress={handlePresentModalPress}
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
      />

      <MapComponent
        mapviewHeight={mapviewHeight}
        mapviewRegion={mapRegion}
        mapviewWidth={mapviewWidth}
      />
    </BottomSheetModalProvider>
  );
};

const PopupButtonTest = styled.Button`
  position: absolute;
  bottom: 100px;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background: red;
`;

export default MapLayout;
