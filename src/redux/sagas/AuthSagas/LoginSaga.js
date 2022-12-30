import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* login(payload) {
  try {
    yield put(actions.login.loading(true));
    yield delay(1000);
    const res = yield call(apis.application_json, payload.body, url.LOGIN_API);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      setCookie("token", res.data.token);
      setCookie("userData", JSON.stringify(res.data));
      yield put(actions.resetAuth.authorise());
      yield put(actions.login.success(false));
      yield delay(1000);
    } else {
      yield put(actions.login.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.login.error(false));
  }
}

function* LogInSaga() {
  yield all([takeEvery(AuthConstants.USER_LOGIN_REQUEST, login)]);
}

export default LogInSaga;
