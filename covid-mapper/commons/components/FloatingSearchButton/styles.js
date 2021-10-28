
import * as React from 'react';
import { StyleSheet, View } from "react-native";
import { SearchIcon } from "../Icons";

export const FloatingButton =()=>(<View style={[
  styles.circle,
  {
    shadowOffset: {
      width: 6,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  }
]}>
  <SearchIcon/>
</View>)

const styles = StyleSheet.create({
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 40,
    height: 40,
    shadowColor: "black",
    width: 40
  },
});
