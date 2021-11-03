import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import { InfoIcon } from "../../../../commons/components/Icons";

const SliderButton = styled(Pressable)`
  position: absolute;
  right: 3%;
  bottom: 10%;
  z-index: 1;
`;

const SliderButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 5px;
  background-color: white;
  border: 1px solid black;
  border-radius: 50px;
`;

const SliderButtonText = styled.Text`
  font-size: 12px;
  color: #000;
  text-align: center;
`;

const PopupSliderButton = ({ handlePresentModalPress }) => (
  <SliderButton onPress={() => handlePresentModalPress()}>
    <SliderButtonWrapper>
      <InfoIcon size={12} />

      <SliderButtonText>Data</SliderButtonText>
    </SliderButtonWrapper>
  </SliderButton>
);

export default PopupSliderButton;
