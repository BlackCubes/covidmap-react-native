import React from "react";
import MapView from "react-native-maps";
import styled from "styled-components";

const StyledMapView = styled(MapView).attrs((props) => ({
  width: props.mapviewWidth,
  height: props.mapviewHeight,
}))``;

const MapComponent = ({ mapviewHeight, mapviewRegion, mapviewWidth }) => (
  <StyledMapView
    mapviewHeight={mapviewHeight}
    mapviewWidth={mapviewWidth}
    region={mapviewRegion}
  />
);

export default MapComponent;
