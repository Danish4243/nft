import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/AuthReducer";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { nftReducer } from "./reducers/NftReducer";

const reducer = combineReducers({
  authReducer: authReducer,
  nftReducer: nftReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export const action = (type) => store.dispatch({ type });
