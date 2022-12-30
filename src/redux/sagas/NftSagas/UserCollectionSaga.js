import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* userCollectionData(payload) {
  try {
    yield put(actions.getUserCollection.loading(true));
    yield delay(1000);
    const res = yield call(apis.get_response, url.GET_USER_COLLECTION_API);
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getUserCollection.success(res));
      yield delay(1000);
    } else {
      yield put(actions.getUserCollection.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getUserCollection.error(error));
  }
}

function* UserCollectionSaga() {
  yield all([
    takeEvery(AuthConstants.GET_USER_COLLECTION_REQUEST, userCollectionData),
  ]);
}

export default UserCollectionSaga;
