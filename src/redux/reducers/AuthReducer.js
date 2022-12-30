import { AuthConstants } from "../constants";

const initialState = {
  isLoading: false,
  isOtpPopUpVisible: false,
  isForgetOtpPopUpVisible: false,
  isAuthorised: false,
  userData: null,
  tempData: null,
  walletAddress: null,
  isDialogeOpen: false,
  modalCategory: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthConstants.USER_LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_LOGIN_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.SEND_OTP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.SEND_OTP_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.SEND_OTP_IS_OPEN:
      return {
        ...state,
        isOtpPopUpVisible: action.isOpen,
      };

    case AuthConstants.USER_REGISTER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_REGISTER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.USER_SIGN_UP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.USER_OTP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_OTP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.USER_OTP_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.FORGOT_OTP_VERIFY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.FORGOT_OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.FORGOT_OTP_VERIFY_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.FORGOT_OTP_VERIFY_POP_UP:
      return {
        ...state,
        isForgetOtpPopUpVisible: action.isOpen,
      };

    case AuthConstants.RESET_PASSWORD_VERIFY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.RESET_PASSWORD_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.RESET_PASSWORD_VERIFY_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.CHANGE_PASSWORD_VERIFY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.CHANGE_PASSWORD_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.CHANGE_PASSWORD_VERIFY_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.UPDATE_USER_PROFILE_VERIFY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.UPDATE_USER_PROFILE_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.UPDATE_USER_PROFILE_VERIFY_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.IMAGE_UPLOAD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.data,
      };

    case AuthConstants.UPDATE_TEMP_DATA:
      return {
        ...state,
        tempData: { ...state.tempData, ...action.data },
      };

    case AuthConstants.UPDATE_AUTHORIZATION:
      return {
        ...state,
        isAuthorised: action.isAuthorised,
      };

    case AuthConstants.UPDATE_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };

    case AuthConstants.SHOW_DIALOG:
      return {
        ...state,
        isDialogeOpen: action.isOpen,
        modalCategory: action.dialogeType,
      };

    case AuthConstants.HIDE_DIALOGE:
      return {
        ...state,
        isDialogeOpen: action.isClose,
      };

    default:
      return state;
  }
};
