import * as React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import styled from "styled-components/native";
import Footer from "./components/Footer";
import LogoSection from "./components/LogoSection";
import MainContent from "./components/MainContent";

const DrawerContentContainer = styled.View`
  flex: 1;
  height: 100%;
  background-color: #203f59;
`;

const ContentWrapper=styled.View`
  height: 100%;
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  margin-top: 0px;
`;

const DrawerContent = (props) => {
  return (
    <DrawerContentContainer>
      <DrawerContentScrollView {...props}>
      <ContentWrapper>
        <LogoSection/>
        {/*End Logo section and Begin DrawerItems section */}
        <MainContent/>
        {/* Github & About Us */}
        <Footer/>
        </ContentWrapper>
      </DrawerContentScrollView>
    </DrawerContentContainer>
  );
};

export default DrawerContent;
