import { RootState } from "../../types";

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsRegisterSucceeded = (state: RootState) =>
  state.auth.isRegisterSucceeded;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.errorMessage;
export const selectIsLoginSucceeded = (state: RootState) =>
  state.auth.isLoginSucceeded;
