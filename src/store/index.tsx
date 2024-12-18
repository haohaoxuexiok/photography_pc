import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/index";
import LocalCache from "../utils/localStorage";

const user = LocalCache.getCache("userInfo");

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      userInfo: user||{},
    },
  },
});

export default store;
