import * as React from "react";
import { Button, View, Text } from "react-native";
import styled from 'styled-components/native';

const Container = styled.View`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.View`
    height: 15%;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: #203F59;
    border-style: solid;
    border-bottom-width: 4px;
    border-bottom-color: #77C280;
    justify-content: center;
    align-items: center;
`;

const VaccineLayout=()=>{

    return (<Container>
            <Header>
                <Text style={{color: '#F6F6F6', fontSize: '20px'}}>Vaccine Candidates in Development</Text>
            </Header>
        {/* Flat list here */}
        <Text>List here</Text>
    </Container>)
}

export default VaccineLayout;