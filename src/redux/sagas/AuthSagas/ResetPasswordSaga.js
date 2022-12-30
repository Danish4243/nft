import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as urls from "../../../constants/urls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* resetPassword(payload) {
  try {
    yield put(actions.login.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.application_json,
      payload.body,
      urls.RESET_PASSWORD,
      payload.token
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.login.success(false));
      yield put(actions.tempData.updateTempData({ token: null }));
      yield delay(1000);
      window.location.replace("/login");
    } else {
      yield put(actions.login.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.login.error(false));
  }
}

function* ResetPasswordSaga() {
  yield all([takeEvery(AuthConstants.RESET_PASSWORD_REQUEST, resetPassword)]);
}

export default ResetPasswordSaga;
