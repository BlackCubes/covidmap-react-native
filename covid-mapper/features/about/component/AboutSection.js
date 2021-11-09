import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { ToadIcon } from "../../../commons/components/Icons";
const SectionContainer = styled.View`
  margin: 6% 0% 0% 0%;
`;
const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 2%;
  margin-right: 2%;
`;
const NameWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 0 auto;
`;

const FlipToad = styled.View`
  transform: scaleX(-1);
`;

const AboutSection = ({ item }) => {
  return (
    <SectionContainer>
      <NameWrapper>
        <ToadIcon />
        <Name style={{ fontFamily: "NotoSans_400Regular", borderColor: "red" }}>
          {item.name}
        </Name>
        <FlipToad>
          <ToadIcon />
        </FlipToad>
      </NameWrapper>
      <Text style={{ color: "#3E3E3E", lineHeight: 20, paddingTop: "4%", fontSize: 16 }}>
        {item.body}
      </Text>
    </SectionContainer>
  );
};

export default AboutSection;
