import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./matchSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
});
