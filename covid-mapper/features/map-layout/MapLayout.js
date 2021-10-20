import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

import MapComponent from "../map/Map";
import Searchbar from "../searchbar/Searchbar";
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

const MapLayout = ({ route }) => {
  const [mapDataArray, setMapDataArray] = useState([]);
  const [mapDataObject, setMapDataObject] = useState(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
  const [searchUSState, setSearchUSState] = useState("");
  const [searchUSCounty, setSearchUSCounty] = useState("");
  const { name: routeName } = route;

  const [testData, setTestData] = useState({
    title: "Fresno",
    location: "Fresno",
    update: "2021-10-12 04:21:09",
    confirmed: 142951,
    deaths: 2035,
    recovered: "Not enough info",
  });

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
  const mapviewRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSearchSubmit = (inputValue) => {
    // Based on the name of the route to update particular states.
    if (routeName === "Country Province Stats") {
      // If there are no inputs for this, then it is the initial start.
      if (!searchCountry.length && !searchProvince.length) {
        setSearchCountry(inputValue);
        setSearchPlaceholder("Search by province");
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

  useEffect(() => {
    // Based on the route names to update the data array or object to be displayed on the map.
    switch (routeName) {
      case "World":
        setMapDataObject(globalCovidStatsData);
        setSearchPlaceholder("Search by world");
        break;
      case "Country Province Stats":
        setMapDataArray(allCountriesProvincesHistoricalData);
        setSearchPlaceholder("Search by country");
        break;
      case "US Total":
        setSearchPlaceholder("Search by US state");
        break;
      case "State Counties Totals":
        setSearchPlaceholder("Search by US state");
        break;
      default:
        setMapDataArray(globalCovidStatsData);
        break;
    }
  }, [routeName]);

  return (
    <>
      <Searchbar
        handleSearchSubmit={handleSearchSubmit}
        searchPlaceholder={searchPlaceholder}
      />

      <OpenSesameButton />

      <PopupSlider testData={testData} />

      <MapComponent
        mapviewHeight={mapviewHeight}
        mapviewRegion={mapviewRegion}
        mapviewWidth={mapviewWidth}
      />
    </>
  );
};

export default MapLayout;
