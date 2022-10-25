import { RootState } from "../../types";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsUpdatedUserSucceeded = (state: RootState) =>
  state.user.isUpdatedUserSucceeded;
export const selectLoadingUser = (state: RootState) => state.user.loadingUpdate;
export const selectLoadingProfileUser = (state: RootState) =>
  state.user.loadingProfileUser;
export const selectProfileUser = (state: RootState) => state.user.profileUser;
export const selectLoadingFollow = (state: RootState) =>
  state.user.loadingFollow;
export const selectNewProfileUserAfterToggleFollow = (state: RootState) =>
  state.user.newProfileUserAfterToggleFollow;
