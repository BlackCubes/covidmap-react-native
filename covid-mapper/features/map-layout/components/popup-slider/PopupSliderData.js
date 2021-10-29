import React from "react";
import styled from "styled-components/native";

import CasesOverTimeGraph from "../../../graphs/TimeLineGraph";
import numSeparator from "../../../../utils/numSeparator";

const SliderDataWrapper = styled.View`
  padding: 17px;
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

const SliderDataInfoValues = styled.Text`
  font-size: 18px;
`;

const PopupSliderData = ({
  cases,
  county,
  deaths,
  hasTimelineSequence,
  provinces,
  recovered,
  state,
}) => (
  <SliderDataWrapper>
    <SliderDataPopulation>
      400 million population size, Merica!!!!
    </SliderDataPopulation>

    <SliderDataUpdate>(updated on {Date(new Date())})</SliderDataUpdate>

    <SliderDataInfo>
      {provinces.length > 0 && (
        <SliderDataInfoValues>{provinces}</SliderDataInfoValues>
      )}

      {state.length > 0 && <SliderDataInfoValues>{state}</SliderDataInfoValues>}

      {county.length > 0 && (
        <SliderDataInfoValues>{county}</SliderDataInfoValues>
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

    {hasTimelineSequence ? <CasesOverTimeGraph graphData={cases} /> : null}
  </SliderDataWrapper>
);

export default PopupSliderData;
