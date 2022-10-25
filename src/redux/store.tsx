import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./saga";
import { articleReducer, authReducer, userReducer } from "./slice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    article: articleReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});
export default store;

sagaMiddleware.run(rootSaga);
