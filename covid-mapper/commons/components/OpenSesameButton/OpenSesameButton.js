import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

import { FloatingButton } from "./styles";

const OpenSesameButton = () => {
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
      <FloatingButton/>
    </Pressable>
  );
};

export default OpenSesameButton;
