import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

import MapComponent from "../map/Map";
import Searchbar from "../searchbar/Searchbar";
import {
  useGetGlobalCovidStatsQuery,
  useGetAllCountriesProvincesHistoricalQuery,
  useGetCountryHistoricalQuery,
  useGetProvinceHistoricalQuery,
} from "../../api/covidApi";
import { OpenSesameButton } from "../../commons/components";
import PopupSlider from "./components/PopupSlider";

const MapLayout = ({ route }) => {
  const [mapDataArray, setMapDataArray] = useState([]);
  const [mapDataObject, setMapDataObject] = useState(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
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

  // - search state/county

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
        break;
      case "State Counties Totals":
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

      <PopupSlider 
        testData={testData} 
        searchCountry={searchCountry} 
        searchProvince={searchProvince}/>

      {/* <MapComponent
        mapviewHeight={mapviewHeight}
        mapviewRegion={mapviewRegion}
        mapviewWidth={mapviewWidth}
      /> */}
    </>
  );
};

export default MapLayout;
