import { configureStore } from "@reduxjs/toolkit";
import { covidApi } from "./api/covidApi";

export const store = configureStore({
  reducer: {
    [covidApi.reducerPath]: covidApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      covidApi.middleware
    );
  },
});
