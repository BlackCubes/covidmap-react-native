export const ModalOverlay = styled.View`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWrapper = styled.View`
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

export const ModalHeader = styled.View`
  margin-bottom: 10px;
`;

export const ModalHeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const ModalContent = styled.View`
  margin-bottom: 20px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: left;
`;

export const ModalContentText = styled.Text`
  font-size: 16px;
`;

export const ModalCloseButton = styled(Pressable)`
  justify-content: center;
  align-items: center;
  width: 95%;
  padding: 10px;
  border: 1px solid #c6c6d1;
  border-radius: 50px;
`;

export const ModalCloseButtonText = styled.Text`
  font-size: 16px;
  color: blue;
`;
