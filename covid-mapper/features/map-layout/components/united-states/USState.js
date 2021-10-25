import React from "react";
import styled from "styled-components/native";

const USStateWrapper = styled.View`
  padding: 17px;
`;

const USStateMain = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const USStateMainHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
`;

const USStatePopulation = styled.Text`
  font-size: 10px;
  margin-bottom: 4px;
`;

const USStateUpdate = styled.Text`
  font-size: 10px;
  margin-bottom: 10px;
`;

const USStateInfo = styled.View`
  margin-bottom: 10px;
`;

const USStateInfoHeader = styled.Text`
  font-size: 15px;
  text-decoration: underline;
`;

const USStateInfoValues = styled.Text`
  font-size: 12px;
`;

const USState = ({
  state,
  updated,
  cases,
  todayCases,
  deaths,
  todayDeaths,
  recovered,
  active,
  casesPerOneMillion,
  deathsPerOneMillion,
  tests,
  testsPerOneMillion,
  population,
}) => (
  <USStateWrapper>
    <USStateMain>
      <USStateMainHeader>{state}</USStateMainHeader>

      <USStatePopulation>{population} population size</USStatePopulation>
    </USStateMain>
    <USStateUpdate>(updated on {Date(new Date(updated))})</USStateUpdate>

    <USStateInfo>
      <USStateInfoHeader>Current:</USStateInfoHeader>

      <USStateInfoValues>
        There are {cases} cases, {deaths} deaths, {recovered} recovered,{" "}
        {active} active cases, and {tests} positive test results.
      </USStateInfoValues>
    </USStateInfo>

    <USStateInfo>
      <USStateInfoHeader>Today:</USStateInfoHeader>

      <USStateInfoValues>
        There are {todayCases} cases and {todayDeaths} deaths.
      </USStateInfoValues>
    </USStateInfo>

    <USStateInfo>
      <USStateInfoHeader>Additional Info:</USStateInfoHeader>

      <USStateInfoValues>
        Per one million, there are {casesPerOneMillion} cases,{" "}
        {deathsPerOneMillion} deaths, and {testsPerOneMillion} positive test
        results.
      </USStateInfoValues>
    </USStateInfo>
  </USStateWrapper>
);

export default USState;
