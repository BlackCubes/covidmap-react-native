import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const ModalProvider = ({ Component }) => (
  <BottomSheetModalProvider>
    <Component />
  </BottomSheetModalProvider>
);

export default ModalProvider;
