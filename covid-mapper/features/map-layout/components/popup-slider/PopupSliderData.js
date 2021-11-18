import React from "react";
import styled from "styled-components/native";

import CasesOverTimeGraph from "../../../graphs/TimeLineGraph";
import numSeparator from "../../../../utils/numSeparator";

const SliderDataWrapper = styled.View`
  padding: 3px 17px 17px 12px;
`;

const SliderDataPopulation = styled.Text`
  font-size: 10px;
  margin-bottom: 4px;
`;

const SliderDataUpdate = styled.Text`
  font-size: 10px;
  margin-bottom: 10px;
`;

const SliderDataInfo = styled.View`
  margin-bottom: 10px;
`;

const SliderDataInfoHeader = styled.Text`
  font-size: 18px;
  text-decoration: underline;
`;

const SliderDataInfoValues = styled.Text`
  font-size: 16px;
  padding-right: 2px;
  padding-left: 2px;
`;

const PopupSliderData = ({
  cases,
  country,
  county,
  deaths,
  hasVaccines,
  hasTimelineSequence,
  population,
  provinces,
  recovered,
  state,
  updatedAt,
}) => (
  <SliderDataWrapper>
    {population > 0 && (
      <SliderDataPopulation>
        {numSeparator(population)} total population size
      </SliderDataPopulation>
    )}

    {updatedAt > 0 && (
      <SliderDataUpdate>(updated on {updatedAt})</SliderDataUpdate>
    )}

    <SliderDataInfo>
      {country.length > 0 && (
        <>
          <SliderDataInfoHeader>Country</SliderDataInfoHeader>

          <SliderDataInfoValues>{country}</SliderDataInfoValues>
        </>
      )}

      {provinces.length > 0 && (
        <>
          <SliderDataInfoHeader>Provinces</SliderDataInfoHeader>

          <SliderDataInfoValues>{provinces}</SliderDataInfoValues>
        </>
      )}

      {state.length > 0 && (
        <>
          <SliderDataInfoValues>{state}</SliderDataInfoValues>
        </>
      )}

      {county.length > 0 && (
        <>
          <SliderDataInfoHeader>County</SliderDataInfoHeader>

          <SliderDataInfoValues>{county}</SliderDataInfoValues>
        </>
      )}

      {!hasTimelineSequence && (
        <SliderDataInfoValues>
          Cases: {numSeparator(cases)}
        </SliderDataInfoValues>
      )}

      {!hasTimelineSequence && (
        <SliderDataInfoValues>
          Recovered: {numSeparator(recovered)} or{" "}
          {((recovered / cases) * 100).toPrecision(4)}%{" "}
        </SliderDataInfoValues>
      )}

      {!hasTimelineSequence && (
        <SliderDataInfoValues>
          Deaths: {numSeparator(deaths)} or{" "}
          {((deaths / cases) * 100).toPrecision(4)}%
        </SliderDataInfoValues>
      )}
    </SliderDataInfo>

    {hasTimelineSequence ? <CasesOverTimeGraph cases={cases} recovered={recovered} deaths={deaths}  hasVaccines={hasVaccines}/> : null}
  </SliderDataWrapper>
);

export default PopupSliderData;
