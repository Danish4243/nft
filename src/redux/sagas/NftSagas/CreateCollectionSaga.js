import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* createCollection(payload) {
  try {
    yield put(actions.createCollection.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.application_json,
      payload.body,
      url.CREATE_COLLECTION_API
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.createCollection.success(false));
      yield delay(1000);
    } else {
      yield put(actions.createCollection.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.createCollection.error(false));
  }
}

function* CreateCollectionSaga() {
  yield all([
    takeEvery(AuthConstants.CREATE_COLLECTION_REQUEST, createCollection),
  ]);
}

export default CreateCollectionSaga;
