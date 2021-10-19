import React, { useState } from "react";
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

const MapLayout = ({ route }) => {
  const [searchCountry, setSearchCountry] = useState("New Zealand");

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
  // const {
  //   data: provinceHistoricalData,
  //   isLoading: provinceHistoricalLoading,
  //   error: provinceHistoricalError,
  // } = useGetProvinceHistoricalQuery();

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

  const handleSearchSubmit = (inputValue) => setSearchCountry(inputValue);

  return (
    <>
      <Searchbar handleSearchSubmit={handleSearchSubmit} />

      <OpenSesameButton />

      <MapComponent
        mapviewHeight={mapviewHeight}
        mapviewRegion={mapviewRegion}
        mapviewWidth={mapviewWidth}
      />
    </>
  );
};

export default MapLayout;
