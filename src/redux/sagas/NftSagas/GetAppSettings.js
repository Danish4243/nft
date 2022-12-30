import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getAppSettings(payload) {
  try {
    yield put(actions.getAppSettingAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.get_response,
      url.GET_APP_SETTING + "?appName=" + payload.id
    );
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getAppSettingAction.success(res));
      setCookie("appId", res?.data?.appId);
      yield delay(1000);
    } else {
      yield put(actions.getAppSettingAction.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getAppSettingAction.error(error));
  }
}

function* GetAppSettings() {
  yield all([
    takeEvery(AuthConstants.GET_APP_SETTINGS_REQUEST, getAppSettings),
  ]);
}

export default GetAppSettings;
