import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getCollectionData(payload) {
  try {
    yield put(actions.getCollection.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.get_response,
      payload.data
        ? url.GET_COLLECTION + "?search=" + payload.data
        : url.GET_COLLECTION
    );
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getCollection.success(res));
      yield delay(1000);
    } else {
      yield put(actions.getCollection.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getCollection.error(error));
  }
}

function* GetCollectionSaga() {
  yield all([
    takeEvery(AuthConstants.GET_COLLECTION_REQUEST, getCollectionData),
  ]);
}

export default GetCollectionSaga;
