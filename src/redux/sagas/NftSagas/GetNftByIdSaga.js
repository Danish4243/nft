import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getNftByIdData(payload) {
  try {
    yield put(actions.getNfts_ById.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.get_response,
      url.GET_NFT_BY_ID_API + "/" + payload.id
    );
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getNfts_ById.success(res));
      yield delay(1000);
    } else {
      yield put(actions.getNfts_ById.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getNfts_ById.error(error));
  }
}

function* GetNftByIdSaga() {
  yield all([takeEvery(AuthConstants.GET_NFT_BY_ID_REQUEST, getNftByIdData)]);
}

export default GetNftByIdSaga;
