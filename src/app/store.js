import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import loaderReducer from "../slices/LoaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});
