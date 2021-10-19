import * as React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";

const FloatingButton = styled.View`
  background-color: orange;
  color: white;
  border-color: white;
  padding: 10px;
  border-radius: 50px;
`;

const MenuIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const DrawerButton = () => {
  const navigation = useNavigation();
  const openMenu = () => navigation.openDrawer();
  return (
    <Pressable
      onPress={openMenu}
      style={{
        position: "absolute",
        right: "10%",
        bottom: "10%",
        zIndex: 10,
      }}
    >
      <FloatingButton>
        <MenuIcon source={require("../../../assets/globe.png")} />
      </FloatingButton>
    </Pressable>
  );
};

export default DrawerButton;