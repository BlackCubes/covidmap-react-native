import React from 'react';
import styled from 'styled-components/native';


const PopupContainer = styled.View`
    width: 100%;
    height: 200px;
    background-color: #273440;
    color: white;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    z-index: 9;
`;

const PopupDivider = styled.View`
    width: 70px;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
`

const PopUpTitle = styled.Text`
    font-size: 20px;
    color: white;
    margin: 20px 120px 10px 0;
`;

const PopupContentContainer = styled.View`
    justify-content: flex-start;
`

const PopupContent = styled.Text`
    font-size: 15px;
    color: white;
`

 

const PopupSlider = ({testData}) => {
    return(
        <PopupContainer>
            <PopupDivider/>
            <PopUpTitle>Latest from {testData.title}</PopUpTitle>
            <PopupContentContainer>
                <PopupContent>Location: {testData.location}</PopupContent>
                <PopupContent>Updated at: {testData.update}</PopupContent>
                <PopupContent>Confirmed Cases: {testData.confirmed}</PopupContent>
                <PopupContent>Deaths: {testData.deaths}</PopupContent>
                <PopupContent>Recovered: {testData.recovered}</PopupContent>
            </PopupContentContainer>
            
        </PopupContainer>
    )
}



export default PopupSlider;