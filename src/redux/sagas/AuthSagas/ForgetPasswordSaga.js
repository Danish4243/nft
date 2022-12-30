import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* forgotPassword({ body }) {
  try {
    yield put(actions.forgotPassword.loading(true));
    yield delay(1000);
    const res = yield call(apis.application_json, body, url.FORGOT_PASSWORD);
    if (res?.statusCode == 200) {
      yield put(actions.forgotPassword.success(false));
      yield put(actions.forgotOtpVerify.open(true));
      toast.success(res.message);
    } else {
      yield put(actions.forgotPassword.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.forgotPassword.error(false));
  }
}

function* forgotPasswordSaga() {
  yield all([takeEvery(AuthConstants.FORGOT_PASSWORD_REQUEST, forgotPassword)]);
}

export default forgotPasswordSaga;
