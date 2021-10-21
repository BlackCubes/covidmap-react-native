import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import DrawerMenu from './features/drawer/DrawerMenu';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let currentLocation = 'Waiting..';
  if (errorMsg) {
    currentLocation = errorMsg;
  } else if (location) {
    currentLocation = JSON.stringify(location);
  }

  
  return (
    <Provider store={store}>
      <DrawerMenu currentLocation={currentLocation}/>
    </Provider>
  );
}


