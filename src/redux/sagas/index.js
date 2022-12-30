import { all } from "redux-saga/effects";
import changePasswordSaga from "./AuthSagas/ChangePasswordSaga";
import forgotOtpVerifySaga from "./AuthSagas/ForgetOtpVerifySaga";
import forgotPasswordSaga from "./AuthSagas/ForgetPasswordSaga";
import ImageUploadSaga from "./AuthSagas/ImageUploadSaga";
import LogInSaga from "./AuthSagas/LoginSaga";
import LogOutSaga from "./AuthSagas/LogOutSaga";
import ResetPasswordSaga from "./AuthSagas/ResetPasswordSaga";
import SendOtpSaga from "./AuthSagas/SendOtpSaga";
import UpdateProfileSaga from "./AuthSagas/UpdateUserProfileSaga";
import verifyOtpSaga from "./AuthSagas/VerifyOtpSaga";
import BuyNftSaga from "./NftSagas/BuyNftSaga";
import CreateCollectionSaga from "./NftSagas/CreateCollectionSaga";
import CreateNftSaga from "./NftSagas/CreateNftSaga";
import GetAppSettings from "./NftSagas/GetAppSettings";
import GetCategorySaga from "./NftSagas/GetCategorySaga";
import GetCollByIdSaga from "./NftSagas/GetCollByIdSaga";
import GetCollectionSaga from "./NftSagas/GetCollection";
import GetNftByIdSaga from "./NftSagas/GetNftByIdSaga";
import GetNftSaga from "./NftSagas/GetNftSaga";
import UpdateCollectionSaga from "./NftSagas/UpdateCollectionSaga";
import UpdateNftSaga from "./NftSagas/UpdateNftSaga";
import UserCollectionSaga from "./NftSagas/UserCollectionSaga";

export default function* rootSaga() {
  yield all([
    LogInSaga(),
    LogOutSaga(),
    SendOtpSaga(),
    verifyOtpSaga(),
    forgotPasswordSaga(),
    forgotOtpVerifySaga(),
    ResetPasswordSaga(),
    changePasswordSaga(),
    UpdateProfileSaga(),
    ImageUploadSaga(),
    CreateNftSaga(),
    GetCategorySaga(),
    CreateCollectionSaga(),
    GetNftSaga(),
    GetCollectionSaga(),
    GetNftByIdSaga(),
    GetCollByIdSaga(),
    UserCollectionSaga(),
    GetAppSettings(),
    UpdateCollectionSaga(),
    UpdateNftSaga(),
    BuyNftSaga(),
  ]);
}
