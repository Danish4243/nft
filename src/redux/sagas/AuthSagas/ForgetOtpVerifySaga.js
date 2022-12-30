import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as urls from "../../../constants/urls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* forgotOtpVerifyFunc({ body }) {
  try {
    yield put(actions.forgotOtpVerify.loading(true));
    yield delay(1000);
    const res = yield call(apis.application_json, body, urls.FORGOT_OTP_VERIFY);
    if (res?.statusCode == 200) {
      yield put(actions.forgotOtpVerify.success(false));
      yield put(actions.forgotOtpVerify.open(false));
      yield put(actions.tempData.updateTempData({ token: res.data?.token }));
      toast.success(res.message);
    } else {
      yield put(actions.forgotOtpVerify.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.forgotOtpVerify.error(false));
  }
}

function* forgotOtpVerifySaga() {
  yield all([
    takeEvery(AuthConstants.FORGOT_OTP_VERIFY_REQUEST, forgotOtpVerifyFunc),
  ]);
}

export default forgotOtpVerifySaga;
