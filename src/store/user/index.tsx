import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../../services/loginAndRegister";
import LocalCache from "../../utils/localStorage";

type FieldType = {
  account: string;
  password: string;
};
export const fetchUserDataAction: any = createAsyncThunk(
  "userInfo",
  async (extraInfo: FieldType, { dispatch, getState }) => {
    const userInfo = await userLogin(extraInfo);
    
    LocalCache.setCache("userInfo", userInfo[0]);
    LocalCache.setCache("token", userInfo[0].token);
    dispatch(keepUserInfo(userInfo[0]));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {}
  },
  reducers: {
    keepUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

export const { keepUserInfo } = userSlice.actions;

export default userSlice.reducer;
