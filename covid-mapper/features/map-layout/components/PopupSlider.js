import React, { useState } from "react";
import styled from "styled-components/native";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";

// test function
// const initialStyle = (modalState)=>{
//     let currStyle=``;

//     if(modalState) {
//         currStyle = `translateY(0px)`
//         return currStyle;
//     } else {
//         console.log(`modalState`, modalState)
//         currStyle = `translateY(180px)`;
//         return currStyle;
//     }
// }

const PopupContainer = styled.View`
  width: 100%;
  height: 250px;
  background-color: #273440;
  color: white;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const PopupDivider = styled.View`
  width: 70px;
  height: 3px;
  background-color: #fff;
  border-radius: 2px;
`;

const PopUpTitle = styled.Text`
  font-size: 20px;
  color: white;
  margin: 20px 120px 10px 0;
`;

const PopupContentContainer = styled.View`
  justify-content: flex-start;
`;

const PopupContent = styled.Text`
  font-size: 15px;
  color: white;
`;

const PopupButtonTest = styled.Button`
  position: absolute;
  margin-top: 0;
  bottom: 0;
`;

const HeaderStyleTest = styled.View`
  margin-top: 0;
  border: 1px solid blue;
`;

const PopupSlider = ({ testData }) => {
  const [showModal, setShowModal] = useState(true);
  const [animateModal, setAnimateModal] = useState(false);

  return (
    <>
      <SwipeUpDownModal
        modalVisible={showModal}
        PressToanimate={animateModal}
        ContentModal={
         
          <PopupContainer>
            <PopupDivider />
            <PopUpTitle>Latest from {testData.title}</PopUpTitle>
            <PopupContentContainer>
              <PopupContent>Location: {testData.location}</PopupContent>
              <PopupContent>Updated at: {testData.update}</PopupContent>
              <PopupContent>Confirmed Cases: {testData.confirmed}</PopupContent>
              <PopupContent>Deaths: {testData.deaths}</PopupContent>
              <PopupContent>Recovered: {testData.recovered}</PopupContent>
            </PopupContentContainer>
          </PopupContainer>
        }
        Headerstyle={<HeaderStyleTest />}
        HeaderContent={
          <PopupButtonTest
            title="Test button"
            onPress={() => setAnimateModal(true)}
          />
        }
        onClose={() => {
          setShowModal(false);
          setAnimateModal(false);
        }}
      ></SwipeUpDownModal>
    </>
  );
};

export default PopupSlider;
