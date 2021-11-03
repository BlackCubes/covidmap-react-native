import React, { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";

import {
  ModalCloseButton,
  ModalCloseButtonText,
  ModalContent,
  ModalContentText,
  ModalHeader,
  ModalHeaderText,
  ModalOverlay,
  ModalWrapper,
} from "./styles";

const ErrorModal = ({ errorMsg, errorStatus, setDataError }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (errorStatus) setModalVisible(true);
    else setModalVisible(false);
  }, [errorStatus]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setDataError({
          error: false,
          message: "",
        });

        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        onPress={() => {
          setDataError({
            error: false,
            message: "",
          });

          setModalVisible(!modalVisible);
        }}
      >
        <ModalOverlay></ModalOverlay>
      </Pressable>

      <ModalWrapper>
        <ModalHeader>
          <ModalHeaderText>Error</ModalHeaderText>
        </ModalHeader>

        <ModalContent>
          <ModalContentText>{errorMsg ? errorMsg : ""}</ModalContentText>
        </ModalContent>

        <ModalCloseButton
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#c6c6d1" : "white",
          })}
          onPress={() => {
            setDataError({
              error: false,
              message: "",
            });

            setModalVisible(!modalVisible);
          }}
        >
          <ModalCloseButtonText>Close</ModalCloseButtonText>
        </ModalCloseButton>
      </ModalWrapper>
    </Modal>
  );
};

export default ErrorModal;
