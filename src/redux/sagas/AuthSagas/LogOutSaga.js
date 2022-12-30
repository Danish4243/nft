import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { deleteCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* logout(payload) {
  try {
    yield put(actions.logout.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.application_json,
      payload.body,
      url.LOGOUT_API,
      payload.token
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      deleteCookie("token");
      deleteCookie("userData");
      yield put(actions.resetAuth.unAuthorise());
      yield put(actions.logout.success(true));
      yield delay(1000);
    } else if (res?.statusCode == 401) {
      yield put(actions.logout.success(true));
      deleteCookie("token");
      deleteCookie("userData");
      yield put(actions.resetAuth.unAuthorise());
    } else {
      yield put(actions.logout.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.logout.error(false));
  }
}

function* LogOutSaga() {
  yield all([takeEvery(AuthConstants.USER_LOGOUT_REQUEST, logout)]);
}

export default LogOutSaga;
