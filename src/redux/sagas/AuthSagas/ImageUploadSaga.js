import { toast } from "react-toastify";
import { takeEvery, put, call, all } from "redux-saga/effects";
import * as actions from "../../actions";
import { AuthConstants } from "../../constants";
import * as apis from "../../services/index";
import * as url from "../../../constants/urls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* ImageUpload(payload) {
  try {
    yield put(actions.imageUpload.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.multipart_form,
      payload.body,
      url.FILE_UPLOAD,
      ""
    );
    if (res?.statusCode == 200) {
      yield put(actions.imageUpload.success(false));
      yield put(actions.tempData.updateTempData({ uploadedImage: res.data }));
      yield delay(1000);
    } else {
      yield put(actions.imageUpload.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.imageUpload.error(false));
  }
}

function* ImageUploadSaga() {
  yield all([takeEvery(AuthConstants.IMAGE_UPLOAD_REQUEST, ImageUpload)]);
}

export default ImageUploadSaga;
