import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const MenuBar = () => {
  return (
    <MenuBarContainer>
      {/* sample buttons */}
      <Button title="Test" />
      <Button title="Test" />
      <Button title="Test" />
    </MenuBarContainer>
  );
};

export const MenuBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  border-top-width: 5px;
  border-top-color: #77c280;
  background-color: #F5F5F5;
`;

export default MenuBar;
