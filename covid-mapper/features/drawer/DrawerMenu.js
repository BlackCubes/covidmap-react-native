import * as React from 'react';
import { Button, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

{/* Components below placeholders */}

  function WorldScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>World Total screen</Text>
        <Button onPress={() => navigation.navigate('About Us')} title="Go to About Us screen" />
      </View>
    );
  }

  function CountryProvinceScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Search Country Provinces screen</Text>
        <Button onPress={() => navigation.goBack()} title="Go to World" />
      </View>
    );
  }

  function USTotalScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>US Total screen</Text>
        <Button onPress={() => navigation.navigate('World')} title="Go to World" />
      </View>
    );
  }

  function StateCountiesTotalScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>State Counties Total screen</Text>
        <Button onPress={() => navigation.navigate('World')} title="Go to World" />
      </View>
    );
  }

  function WorldVaxTotalsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>World Vaccination Totals screen</Text>
        <Button onPress={() => navigation.navigate('World')} title="Go to World" />
      </View>
    );
  }


  function USVaxTotalScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>US Vaccination Total screen</Text>
        <Button onPress={() => navigation.navigate('World')} title="Go to World" />
      </View>
    );
  }

  function TrialDataScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Trial Data screen</Text>
        <Button onPress={() => navigation.navigate('World')} title="Go to World" />
      </View>
    );
  }

  function AboutUsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Us screen</Text>
        <Button onPress={() => navigation.navigate('World')} title="Go to World Stat" />
      </View>
    );
  }
  
const DrawerMenu =()=>{
    return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="WorldScreen" drawerContent={props=><DrawerContent {...props}/>}>
            {/* For testing purposes */}
            <Drawer.Screen name="World" component={WorldScreen} />
            <Drawer.Screen name="Country Province Stats" component={CountryProvinceScreen} />
            {/* WORLD */}
        
            {/* US */}
            <Drawer.Screen name="US Total" component={USTotalScreen} />
            <Drawer.Screen name="State Counties Totals" component={StateCountiesTotalScreen} />
            {/* Vaccine */}
            <Drawer.Screen name="World Vaccination Totals" component={WorldVaxTotalsScreen} />
            <Drawer.Screen name="US Vaccination Total" component={USVaxTotalScreen} />
            <Drawer.Screen name="Trial Data" component={TrialDataScreen} />           
            {/* Bottom Content */}
            <Drawer.Screen name="About Us" component={AboutUsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
}

export default DrawerMenu;