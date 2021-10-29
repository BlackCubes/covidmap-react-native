
import * as React from 'react';
import { StyleSheet, View, Platform } from "react-native";
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
    borderRadius: 48,
    height: 48,
    shadowColor: "black",
    width: 48,
    borderStyle: 'solid',
    borderColor: '#2EC2A0',
    borderWidth: 1
  },
});
