import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface authState {
  userInfo: {
    userId: string;
    userImage: string;
    username: string;
  };
  userToken: string | null;
}

const initialState: authState = {
  userInfo: {
    userId: "",
    userImage: "",
    username: "",
  },
  userToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authState>) => {
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
