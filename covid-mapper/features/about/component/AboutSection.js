import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import {ToadIcon} from '../../../commons/components/Icons'
const SectionContainer = styled.View`
  padding: 6% 0% 10% 0%;
`;
const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 6px;
`;
const NameWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
`;

const AboutSection =({item})=>{

    return (<SectionContainer>
        <NameWrapper>
          <ToadIcon/>
          <Name style={{ fontFamily: "NotoSans_400Regular", marginBottom: '2%',borderColor:'red' }}>{item.name}</Name>
        </NameWrapper>
        <Text style={{color: '#3E3E3E'}}>{item.body}</Text>
      </SectionContainer>)
}

export default AboutSection;