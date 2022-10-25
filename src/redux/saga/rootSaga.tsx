import { all } from "redux-saga/effects";
import { wacherFetchArticle } from "./articleSaga";
import { wacherAuth } from "./authSaga";
import { watcherUser } from "./userSaga";

function* rootSaga() {
  yield all([wacherFetchArticle(), wacherAuth(), watcherUser()]);
}

export default rootSaga;
