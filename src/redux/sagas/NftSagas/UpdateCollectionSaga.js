import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* updateCollection(payload) {
  console.log({ payload }, "lplplpghjfghfg");
  try {
    yield put(actions.updateCollection.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.putApi,
      payload.payload.body,
      url.UPDATE_COLLECTION + "/" + payload.payload.id
    );
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      // setCookie("userData", JSON.stringify(res.data));
      yield put(actions.updateCollection.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.updateCollection.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.updateCollection.error(false));
  }
}

function* UpdateCollectionSaga() {
  yield all([
    takeEvery(AuthConstants.UPDATE_COLLECTION_REQUEST, updateCollection),
  ]);
}

export default UpdateCollectionSaga;
