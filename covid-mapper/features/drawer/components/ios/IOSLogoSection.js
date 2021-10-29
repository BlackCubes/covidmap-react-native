import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet,View } from "react-native";
import styled from "styled-components/native";

const LogoImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 3px;
  margin-right: 4px;
`;
const LogoText = styled.Text`
  color: #ddd;
  font-weight: bold;
  font-size: 18px;
`;

const IOSLogoSection =()=>(
    <View
      style={{
        height: "8%",
        marginBottom: "0%",
        paddingBottom: "0%",
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["#203f59", "black","#77c280"]} // top to bottom
        style={styles.background}
        end={{
          x: 0.5, y: 0.95
        }}
        locations={[
          0, 0.95,1
        ]}
      >
        <LogoImage source={require("../../../../assets/logo.png")} />
        <LogoText>COVID Mapper</LogoText>
      </LinearGradient>
    </View>
  );

  const styles = StyleSheet.create({
    background: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#77c280'
    },
  });

  export default IOSLogoSection;