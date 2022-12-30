import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* buyNftCall(payload) {
  console.log({ payload }, "lplplpghjfghfg");
  try {
    yield put(actions.buyNftAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.putApi,
      payload.payload.body,
      url.BUY_NFT + "/" + payload.payload.id
    );
    if (res?.statusCode == 200) {
      console.log(res.data, "hiiiii");
      // toast.success(res.message);
      // setCookie("userData", JSON.stringify(res.data));
      yield put(actions.buyNftAction.success(res.data));
      yield put(actions.getNfts_ById.request(payload.payload.id));
      yield delay(1000);
    } else {
      yield put(actions.buyNftAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.buyNftAction.error(false));
  }
}

function* BuyNftSaga() {
  yield all([takeEvery(AuthConstants.BUY_NFT_REQUEST, buyNftCall)]);
}

export default BuyNftSaga;
