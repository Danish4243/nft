import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* updateNftCall(payload) {
  console.log({ payload }, "lplplpghjfghfg");
  try {
    yield put(actions.updateNft.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.putApi,
      payload.payload.body,
      url.UPDATE_NFT + "/" + payload.payload.id
    );
    if (res?.statusCode == 200) {
      console.log(res.data, "hiiiii");
      // toast.success(res.message);
      // setCookie("userData", JSON.stringify(res.data));
      yield put(actions.updateNft.success(res.data));
      yield put(actions.getNfts_ById.request(payload.payload.id));
      yield delay(1000);
    } else {
      yield put(actions.updateNft.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.updateNft.error(false));
  }
}

function* UpdateNftSaga() {
  yield all([takeEvery(AuthConstants.UPDATE_NFT_REQUEST, updateNftCall)]);
}

export default UpdateNftSaga;
