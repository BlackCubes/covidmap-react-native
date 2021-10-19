import React,{useState} from "react";
import { useWindowDimensions } from "react-native";

import MapComponent from "../map/Map";
import Searchbar from "../searchbar/Searchbar";
import { OpenSesameButton } from "../../commons/components";


const MapLayout = () => {
  const [testData, setTestData] = useState({title: 'Fresno', location: 'Fresno', update: '2021-10-12 04:21:09', confirmed: 142951, deaths: 2035, recovered: 'Not enough info' });
  const { width: mapviewWidth, height: mapviewHeight } = useWindowDimensions();
  const mapviewRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <>
      {/* <Searchbar /> */}

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
