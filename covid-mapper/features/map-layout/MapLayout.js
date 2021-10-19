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

const MapLayout = ({ route }) => {
  const [mapDataArray, setMapDataArray] = useState([]);
  const [mapDataObject, setMapDataObject] = useState(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
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

  // - search state/county

  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();
  const mapviewRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSearchSubmit = (inputValue) => {
    if (routeName === "Country Province Stats") {
      if (!searchCountry.length && !searchProvince.length) {
        setSearchCountry(inputValue);
        setSearchPlaceholder("Search by province");
      } else {
        setSearchProvince(inputValue);
      }
    }
  };

  useEffect(() => {
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

  console.log(provinceHistoricalData);

  return (
    <>
      <Searchbar
        handleSearchSubmit={handleSearchSubmit}
        searchPlaceholder={searchPlaceholder}
      />

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
