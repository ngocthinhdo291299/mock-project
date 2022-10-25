import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authInitialSateType {
  loading: boolean;
  isRegisterSucceeded: boolean;
  isLoginSucceeded: boolean;
  token: string;
  errorMessage: any;
}

const initialState: authInitialSateType = {
  loading: false,
  isRegisterSucceeded: false,
  isLoginSucceeded: false,
  token: "",
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    REGISTER_REQUESTED: (state, action: any) => {
      state.loading = true;
    },
    REGISTER_SUCCESSED: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isRegisterSucceeded = true;
      state.token = action.payload;
    },
    REGISTER_FAILED: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    LOGIN_REQUESTED: (state, data: any) => {
      state.loading = true;
    },
    LOGIN_SUCCEEDED: (state, action) => {
      state.loading = false;
      state.isLoginSucceeded = true;
      state.token = action.payload.token;
      state.errorMessage = "";
    },
    LOGIN_FAILED: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.error;
    },
    RESET_AUTH_STATE: (state) => {
      state.isLoginSucceeded = false;
      state.errorMessage = "";
      state.isRegisterSucceeded = false;
      state.loading = false;
    },
  },
});

export const {
  REGISTER_REQUESTED,
  REGISTER_FAILED,
  REGISTER_SUCCESSED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
  RESET_AUTH_STATE,
} = authSlice.actions;
export default authSlice.reducer;
