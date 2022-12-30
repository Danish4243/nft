import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getCategoryData(payload) {
  try {
    yield put(actions.getCategoryAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.get_response, url.GET_CATEGORY_API);
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getCategoryAction.success(res));
      yield delay(1000);
    } else {
      yield put(actions.getCategoryAction.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getCategoryAction.error(error));
  }
}

function* GetCategorySaga() {
  yield all([takeEvery(AuthConstants.GET_CATEGORY_REQUEST, getCategoryData)]);
}

export default GetCategorySaga;
