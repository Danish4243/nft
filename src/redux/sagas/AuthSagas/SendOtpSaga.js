import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* sendOtp(payload) {
  try {
    yield put(actions.sendOtp.loading(true));
    yield delay(1000);
    const res = yield call(apis.application_json, payload.body, url.SEND_OTP);
    if (res?.statusCode == 200) {
      yield put(actions.sendOtp.success(false));
      yield put(actions.sendOtp.isOpen(true));
      toast.success(res.message);
    } else {
      yield put(actions.sendOtp.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.sendOtp.error(false));
  }
}

function* SendOtpSaga() {
  yield all([takeEvery(AuthConstants.SEND_OTP_REQUEST, sendOtp)]);
}

export default SendOtpSaga;
