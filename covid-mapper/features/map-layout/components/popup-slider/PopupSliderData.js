import React from "react";
import styled from "styled-components/native";

import { CasesOverTimeGraph, OverviewGraph } from "../../../graphs";
import numSeparator from "../../../../utils/numSeparator";

const SliderDataWrapper = styled.View`
  padding: 3px 17px 17px 12px;
`;

const SliderDataPopulation = styled.Text`
  font-size: 10px;
  margin-bottom: 4px;
  padding-right: 2px;
  padding-left: 2px;
`;

const SliderDataUpdate = styled.Text`
  font-size: 10px;
  margin-bottom: 10px;
  padding-right: 2px;
  padding-left: 2px;
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

const SliderDataBoldInfoValues = styled(SliderDataInfoValues)`
  font-weight: bold;
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
}) => {
  const divideBy = population > 0 ? population : cases;

  return (
    <SliderDataWrapper>
      <SliderDataInfo>
        {country.length > 0 && (
          <>
            <SliderDataBoldInfoValues>{country}</SliderDataBoldInfoValues>
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
            <SliderDataBoldInfoValues>{state}</SliderDataBoldInfoValues>
          </>
        )}

        {county.length > 0 && (
          <>
            <SliderDataBoldInfoValues>{county}</SliderDataBoldInfoValues>
          </>
        )}

        {population > 0 && (
          <SliderDataPopulation>
            {numSeparator(population)} total population size
          </SliderDataPopulation>
        )}

        {updatedAt > 0 && (
          <SliderDataUpdate>(updated on {updatedAt})</SliderDataUpdate>
        )}

        {!hasTimelineSequence && (
          <SliderDataInfoValues>
            Cases: {numSeparator(cases)}
            {population && population > 0
              ? ` or ${((cases / divideBy) * 100).toPrecision(4)}%`
              : ""}
          </SliderDataInfoValues>
        )}

        {!hasTimelineSequence && (
          <SliderDataInfoValues>
            Recovered: {numSeparator(recovered)} or{" "}
            {((recovered / divideBy) * 100).toPrecision(4)}%{" "}
          </SliderDataInfoValues>
        )}

        {!hasTimelineSequence && (
          <SliderDataInfoValues>
            Deaths: {numSeparator(deaths)} or{" "}
            {((deaths / divideBy) * 100).toPrecision(4)}%
          </SliderDataInfoValues>
        )}
      </SliderDataInfo>

      {hasTimelineSequence ? (
        <CasesOverTimeGraph
          cases={cases}
          recovered={recovered}
          deaths={deaths}
          hasVaccines={hasVaccines}
        />
      ) : (
        <OverviewGraph
          cases={cases}
          deaths={deaths}
          population={population}
          recovered={recovered}
        />
      )}
    </SliderDataWrapper>
  );
};

export default PopupSliderData;
