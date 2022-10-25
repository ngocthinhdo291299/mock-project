import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../types";
import { profileType } from "../../types/userType";

interface userInitialSateType {
  loadingCurrentUser: boolean;
  loadingProfileUser: boolean;
  loadingUpdate: boolean;
  loadingFollow: boolean;
  isUpdatedUserSucceeded: boolean;
  currentUser: userType | undefined;
  profileUser: profileType | undefined;
  newProfileUserAfterToggleFollow: profileType | undefined;
}

const initialState: userInitialSateType = {
  loadingCurrentUser: false,
  loadingUpdate: false,
  loadingProfileUser: false,
  loadingFollow: false,
  isUpdatedUserSucceeded: false,
  currentUser: undefined,
  profileUser: undefined,
  newProfileUserAfterToggleFollow: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UPDATE_USER_REQUESTED: (state, action: any) => {
      state.loadingUpdate = true;
    },
    UPDATE_USER_SUCCEEDED: (state) => {
      state.loadingUpdate = false;
      state.isUpdatedUserSucceeded = true;
    },
    UPDATE_USER_FAILED: (state, action) => {
      state.loadingUpdate = false;
    },
    FETCH_CURRENT_USER_REQUESTED: (state) => {
      state.loadingCurrentUser = true;
    },
    FETCH_CURRENT_USER_SUCCEEDED: (state, action) => {
      state.loadingCurrentUser = false;
      state.currentUser = action.payload;
    },
    FETCH_CURRENT_USER_FAILED: (state, action) => {
      state.loadingCurrentUser = false;
    },
    FETCH_PROFILE_USER_REQUESTED: (state, action) => {
      state.loadingProfileUser = true;
    },
    FETCH_PROFILE_USER_SUCCEEDED: (state, action) => {
      state.loadingProfileUser = false;
      state.profileUser = action.payload;
    },
    FETCH_PROFILE_USER_FAILED: (state, action) => {
      state.loadingProfileUser = false;
    },
    SET_IS_UPDATED_USER_SUCCEEDED: (state, action) => {
      state.isUpdatedUserSucceeded = action.payload;
    },
    TOGGLE_FOLLOW_USER_REQUESTED: (state, _) => {
      state.loadingFollow = true;
    },
    TOGGLE_FOLLOW_USER_SUCCEEDED: (state, action) => {
      state.loadingFollow = false;
      state.newProfileUserAfterToggleFollow = action.payload;
    },
    TOGGLE_FOLLOW_USER_FAILED: (state) => {
      state.loadingFollow = false;
    },
    CLEAN_UP_USER_STATE: (state) => {
      state.currentUser = undefined;
      state.profileUser = undefined;
      state.newProfileUserAfterToggleFollow = undefined;
    },
  },
});

export const {
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUESTED,
  UPDATE_USER_SUCCEEDED,
  FETCH_CURRENT_USER_FAILED,
  FETCH_CURRENT_USER_SUCCEEDED,
  FETCH_PROFILE_USER_FAILED,
  FETCH_PROFILE_USER_SUCCEEDED,
  FETCH_CURRENT_USER_REQUESTED,
  FETCH_PROFILE_USER_REQUESTED,
  SET_IS_UPDATED_USER_SUCCEEDED,
  TOGGLE_FOLLOW_USER_FAILED,
  TOGGLE_FOLLOW_USER_REQUESTED,
  TOGGLE_FOLLOW_USER_SUCCEEDED,
  CLEAN_UP_USER_STATE,
} = userSlice.actions;
export default userSlice.reducer;
