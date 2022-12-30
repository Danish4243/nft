import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getCollectionByIdData(payload) {
  try {
    yield put(actions.getCollection_ById.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.get_response,
      url.GET_COLLECTION_BY_ID + "?id=" + payload.id
    );
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getCollection_ById.success(res));
      yield delay(1000);
    } else {
      yield put(actions.getCollection_ById.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getCollection_ById.error(error));
  }
}

function* GetCollByIdSaga() {
  yield all([
    takeEvery(
      AuthConstants.GET_COLLECTION_BY_ID_REQUEST,
      getCollectionByIdData
    ),
  ]);
}

export default GetCollByIdSaga;
