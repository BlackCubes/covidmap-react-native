import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import DrawerMenu from './features/drawer/Drawer'

export default function App() {
  return (
    <Provider store={store}>
      <DrawerMenu/>
    </Provider>
  );
}


