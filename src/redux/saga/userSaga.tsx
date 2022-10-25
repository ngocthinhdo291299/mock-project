import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { userApi } from "../../apis";
import { userType } from "../../types";
import { profileType } from "../../types/userType";
import {
  FETCH_CURRENT_USER_FAILED,
  FETCH_CURRENT_USER_REQUESTED,
  FETCH_CURRENT_USER_SUCCEEDED,
  FETCH_PROFILE_USER_FAILED,
  FETCH_PROFILE_USER_REQUESTED,
  FETCH_PROFILE_USER_SUCCEEDED,
  TOGGLE_FOLLOW_USER_FAILED,
  TOGGLE_FOLLOW_USER_REQUESTED,
  TOGGLE_FOLLOW_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUESTED,
  UPDATE_USER_SUCCEEDED,
} from "../slice/userSlice";

function* update(action: PayloadAction<any>): any {
  try {
    console.log(action.payload);
    yield call(() => userApi.update(action.payload));
    yield put(UPDATE_USER_SUCCEEDED());
  } catch (error) {
    yield put(UPDATE_USER_FAILED(error));
  }
}

function* toggleFollow(action: any): any {
  const profileUser = action.payload;
  console.log(profileUser);
  try {
    const newProfile = yield call(() =>
      profileUser.following
        ? userApi.unfollow(profileUser.username)
        : userApi.follow(profileUser.username)
    );
    yield put({
      type: TOGGLE_FOLLOW_USER_SUCCEEDED.type,
      payload: newProfile.profile,
    });
  } catch (error) {
    yield put({ type: TOGGLE_FOLLOW_USER_FAILED.type });
  }
}

function* fetchCurrent(): any {
  try {
    let { user } = yield call(userApi.getCurrent);
    yield put(FETCH_CURRENT_USER_SUCCEEDED(user));
  } catch (error) {
    yield put(FETCH_CURRENT_USER_FAILED(error));
  }
}

function* fetchProfile(action: PayloadAction<any>): any {
  try {
    const { profile } = yield call(() => userApi.getProfile(action.payload));
    yield put(FETCH_PROFILE_USER_SUCCEEDED(profile));
  } catch (error) {
    yield put(FETCH_PROFILE_USER_FAILED(error));
  }
}

export function* watcherUser() {
  yield takeEvery(UPDATE_USER_REQUESTED.type, update);
  yield takeEvery(TOGGLE_FOLLOW_USER_REQUESTED.type, toggleFollow);
  yield takeEvery(FETCH_CURRENT_USER_REQUESTED.type, fetchCurrent);
  yield takeEvery(FETCH_PROFILE_USER_REQUESTED.type, fetchProfile);
}
