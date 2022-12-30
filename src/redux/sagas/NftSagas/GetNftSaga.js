import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getNftData(payload) {
  try {
    yield put(actions.getNfts.loading(true));
    yield delay(1000);
    const res = yield call(apis.get_response, url.GET_NFT_API);
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getNfts.success(res));
      yield delay(1000);
    } else {
      yield put(actions.getNfts.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getNfts.error(error));
  }
}

function* GetNftSaga() {
  yield all([takeEvery(AuthConstants.GET_NFT_REQUEST, getNftData)]);
}

export default GetNftSaga;
