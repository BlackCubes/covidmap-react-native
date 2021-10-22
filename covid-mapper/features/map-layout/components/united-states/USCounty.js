import React from "react";
import styled from "styled-components/native";

const USCountyWrapper = styled.View`
  padding: 17px;
`;

const USCountyMain = styled.View`
  margin-bottom: 10px;
`;

const USCountyMainHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const USCounty = ({ county, timeline }) => {
  return (
    <USCountyWrapper>
      <USCountyMain>
        <USCountyMainHeader>{county} county</USCountyMainHeader>
      </USCountyMain>
    </USCountyWrapper>
  );
};

export default USCounty;
