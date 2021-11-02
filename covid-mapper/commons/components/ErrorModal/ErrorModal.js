import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import styled from "styled-components/native";

const ModalOverlay = styled.View`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.View`
  display: flex;
  position: absolute;
  top: 30%;
  left: 10%;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 250px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  z-index: 10;
`;

const ModalHeader = styled.View`
  margin-bottom: 10px;
`;

const ModalHeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ModalContent = styled.View`
  margin-bottom: 20px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: left;
`;

const ModalContentText = styled.Text`
  font-size: 16px;
`;

const ModalCloseButton = styled(Pressable)`
  justify-content: center;
  align-items: center;
  width: 95%;
  padding: 10px;
  border: 1px solid #c6c6d1;
  border-radius: 50px;
`;

const ModalCloseButtonText = styled.Text`
  font-size: 16px;
  color: blue;
`;

const ErrorModal = ({ error }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setModalVisible(true);
    }
  }, [error]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <ModalOverlay></ModalOverlay>
      </Pressable>

      <ModalWrapper>
        <ModalHeader>
          <ModalHeaderText>Error</ModalHeaderText>
        </ModalHeader>

        <ModalContent>
          <ModalContentText>
            {error?.data?.message ? error.data.message : ""}
          </ModalContentText>
        </ModalContent>

        <ModalCloseButton
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#c6c6d1" : "white",
          })}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <ModalCloseButtonText>Close</ModalCloseButtonText>
        </ModalCloseButton>
      </ModalWrapper>
    </Modal>
  );
};

export default ErrorModal;
