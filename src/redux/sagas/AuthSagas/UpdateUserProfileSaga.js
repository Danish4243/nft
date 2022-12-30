import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* updateProfile(payload) {
  try {
    yield put(actions.updateProfile.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.application_json,
      payload.body,
      url.UPDATE_PROFILE
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      setCookie("userData", JSON.stringify(res.data));
      // setCookie("userData", JSON.stringify(res.data));
      yield put(actions.updateProfile.success(false));
      yield delay(1000);
    } else {
      if (res?.message == "DUPLICATE_WALLET_ADDRESS") {
        yield put(actions.updateWallet.setWalletAddress(null));
      }
      yield put(actions.updateProfile.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.updateProfile.error(false));
  }
}

function* UpdateProfileSaga() {
  yield all([
    takeEvery(AuthConstants.UPDATE_USER_PROFILE_REQUEST, updateProfile),
  ]);
}

export default UpdateProfileSaga;
