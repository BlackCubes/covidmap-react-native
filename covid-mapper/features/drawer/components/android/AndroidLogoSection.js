import * as React from "react";
import styled from "styled-components/native";

const LogoContainer = styled.View`
  height: 8%;
  width: 100%;
  background-color: #203f59;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6% 0% 0% 0%;
`;

const GreenBorder = styled.View`
  border-bottom-width: 3px;
  border-bottom-color: #77c280;
  margin-top: 2%;
`;

const LogoText = styled.Text`
  color: #ddd;
  font-weight: bold;
  font-size: 18px;
`;

const LogoImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 3px;
  margin-right: 4px;
`;

const AndroidLogoSection =()=>{
    return (
        <>
          <LogoContainer>
            <LogoImage source={require("../../../../assets/logo.png")} />
            <LogoText>COVID Mapper</LogoText>
          </LogoContainer>
          <GreenBorder />
        </>
      );
}

export default AndroidLogoSection;