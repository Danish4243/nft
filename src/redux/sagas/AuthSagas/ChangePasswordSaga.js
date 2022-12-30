import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* changePassword(payload) {
  try {
    yield put(actions.changePassword.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.application_json,
      payload.body,
      url.CHANGE_PASSWORD
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.changePassword.success(false));
      yield delay(1000);
      window.location.replace("/");
    } else {
      yield put(actions.changePassword.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.changePassword.error(false));
  }
}

function* changePasswordSaga() {
  yield all([takeEvery(AuthConstants.CHANGE_PASSWORD_REQUEST, changePassword)]);
}

export default changePasswordSaga;
