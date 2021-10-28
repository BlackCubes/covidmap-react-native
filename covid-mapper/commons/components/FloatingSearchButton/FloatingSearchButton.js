import * as React from "react";
import { Pressable } from "react-native";
import { FloatingButton } from "./styles";

const FloatingSearchButton=({pressHandler})=>{
    return (
        <Pressable
          onPress={pressHandler}
          style={{
            position: "absolute",
            right: "10%",
            bottom: "20%",
            zIndex: 10,
          }}
        >
          <FloatingButton/>
        </Pressable>
      );
}


export default FloatingSearchButton;