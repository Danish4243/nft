import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* createForm(payload) {
  try {
    yield put(actions.createNftForm.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.application_json,
      payload.body,
      url.CREATE_NFT_API
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      // setCookie("userData", JSON.stringify(res.data));
      yield put(actions.createNftForm.success(false));
      yield delay(1000);
    } else {
      if (res?.message == "DUPLICATE_WALLET_ADDRESS") {
        yield put(actions.updateWallet.setWalletAddress(null));
      }
      yield put(actions.createNftForm.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.createNftForm.error(false));
  }
}

function* CreateNftSaga() {
  yield all([takeEvery(AuthConstants.CREATE_NFT_FORM_REQUEST, createForm)]);
}

export default CreateNftSaga;
