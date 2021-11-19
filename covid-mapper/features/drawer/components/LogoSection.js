import * as React from "react";
import styled from "styled-components/native";
import { Platform, Text,View } from "react-native";
import IOSLogoSection from "./ios/IOSLogoSection";
import AndroidLogoSection from "./android/AndroidLogoSection";

const LogoSection = () => {
  return Platform.OS==='ios' ?
    (<IOSLogoSection/>) 
        :
  (<AndroidLogoSection/>);
};



export default LogoSection;
