import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import styled from "styled-components";
import { Text } from "react-native";

const StyledMapView = styled(MapView).attrs((props) => ({
  width: props.mapviewWidth,
  height: props.mapviewHeight,
}))``;

const MapComponent = ({ mapviewHeight, mapviewRegion, mapviewWidth }) => {
  const [markers, setMarkers] = useState([
    {
      type: "userMarker",
      title: "Current Location",
      color: "green",
      latlong: {
        latitude: mapviewRegion.latitude,
        longitude: mapviewRegion.longitude,
      },
    },
    {
      type: "searchedMarker",
      title: "Searched Location",
      color: "red",
      latlong: {
        latitude: mapviewRegion.latitude,
        longitude: mapviewRegion.longitude,
      },
    },
  ]);

  useEffect(() => {
    if (mapviewRegion) {
      setMarkers((previousRegions) =>
        previousRegions.map((prevRegion) => {
          if (prevRegion.type === "searchedMarker") {
            prevRegion.latlong = {
              latitude: mapviewRegion.latitude,
              longitude: mapviewRegion.longitude,
            };
          }
          return prevRegion;
        })
      );
    }
  }, [mapviewRegion]);

  return (
    <StyledMapView
      mapviewHeight={mapviewHeight}
      mapviewWidth={mapviewWidth}
      region={mapviewRegion}
      provider="google"
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlong}
          title={marker.title}
          pinColor={marker.color}
        />
      ))}

      {/* // ----Might need later */}
      {/* <Circle center={pin} radius={1000} /> */}
    </StyledMapView>
  );
};

export default MapComponent;
