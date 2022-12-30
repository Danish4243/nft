import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* verifyOtp({ body }) {
  try {
    yield put(actions.otp.loading(true));
    yield delay(1000);
    const res = yield call(apis.application_json, body.forOtp, url.VERIFY_OTP);
    if (res?.statusCode == 200) {
      body.forRegister["phoneCode"] = res?.data?.phoneCode;
      yield put(actions.otp.success(false));
      yield call(userRegister, body.forRegister);
      toast.success(res.message);
    } else {
      yield put(actions.otp.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.otp.error(false));
  }
}

export function* userRegister(body) {
  try {
    yield put(actions.userRegister.loading(true));
    yield delay(1000);
    const res = yield call(apis.application_json, body, url.USER_REGISTER_API);
    if (res?.statusCode == 200) {
      yield put(actions.userRegister.success(false));
      yield put(actions.sendOtp.isOpen(false));
      setCookie("token", res.data.user.token);
      setCookie("userData", JSON.stringify(res.data.user));
      yield put(actions.resetAuth.authorise());
      toast.success(res.message);
    } else {
      yield put(actions.userRegister.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.userRegister.error(false));
  }
}

function* verifyOtpSaga() {
  yield all([takeEvery(AuthConstants.USER_OTP_REQUEST, verifyOtp)]);
}

export default verifyOtpSaga;
