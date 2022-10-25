import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeEvery, put } from "redux-saga/effects";
import { authApi } from "../../apis";
import { TEXT_LOGIN_FAILED } from "../../constants";
import { loginDataType, registerDataType } from "../../types/authType";
import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  REGISTER_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCESSED,
} from "../slice/authSlice";

export function* register(action: PayloadAction<registerDataType>): any {
  try {
    const { user } = yield call(() => authApi.register(action.payload));
    const token = user.token;
    yield put(REGISTER_SUCCESSED(token));
  } catch (error) {
    yield put(REGISTER_FAILED(error));
  }
}

export function* login(action: PayloadAction<loginDataType>): any {
  try {
    const { user } = yield call(() => authApi.login(action.payload));
    yield put(LOGIN_SUCCEEDED({ token: user.token, username: user.username }));
  } catch (error) {
    yield put(LOGIN_FAILED({ error: error }));
  }
}

export function* wacherAuth() {
  yield takeEvery(REGISTER_REQUESTED.type, register);
  yield takeEvery(LOGIN_REQUESTED.type, login);
}
