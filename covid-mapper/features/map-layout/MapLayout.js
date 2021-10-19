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
  const [searchCountry, setSearchCountry] = useState("New Zealand");
  const [searchProvince, setSearchProvince] = useState("mainland");

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

  const handleSearchSubmit = (inputValue) => setSearchCountry(inputValue);

  useEffect(() => {
    switch (route.name) {
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
  }, [route]);

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
