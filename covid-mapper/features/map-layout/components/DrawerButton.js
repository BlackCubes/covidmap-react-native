import * as React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";

const FloatingButton = styled.View`
  background-color: orange;
  color: white;
  border-color: white;
  padding: 10px
  border-radius: 50px;
`;

const DrawerButton = () => {
  const navigation = useNavigation();
  const openMenu = () => navigation.openDrawer();
  return (
      <Pressable onPress={openMenu}>
        <FloatingButton>
            <Text>Menu</Text>
        </FloatingButton>
      </Pressable>
  );
};

export default DrawerButton;
