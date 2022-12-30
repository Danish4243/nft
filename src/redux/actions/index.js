import { AuthConstants } from "../constants";
export const login = {
  request: (body) => ({
    type: AuthConstants.USER_LOGIN_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.USER_LOGIN_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.USER_LOGIN_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.USER_LOGIN_ERROR,
    isLoading: isLoading,
  }),
};

export const logout = {
  request: (body, token) => ({
    type: AuthConstants.USER_LOGOUT_REQUEST,
    body: body,
    token: token,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.USER_LOGOUT_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.USER_LOGOUT_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.USER_LOGOUT_ERROR,
    isLoading: isLoading,
  }),
};

export const sendOtp = {
  request: (body) => ({
    type: AuthConstants.SEND_OTP_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.SEND_OTP_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.SEND_OTP_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.SEND_OTP_ERROR,
    isLoading: isLoading,
  }),
  isOpen: (isOpen) => ({
    type: AuthConstants.SEND_OTP_IS_OPEN,
    isOpen: isOpen,
  }),
};

export const userRegister = {
  request: (body) => ({
    type: AuthConstants.USER_REGISTER_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.USER_REGISTER_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.USER_REGISTER_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.USER_REGISTER_ERROR,
    isLoading: isLoading,
  }),
};

export const signUp = {
  request: (body) => ({
    type: AuthConstants.USER_SIGN_UP_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.USER_SIGN_UP_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.USER_SIGN_UP_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.USER_SIGN_UP_ERROR,
    isLoading: isLoading,
  }),
};

export const otp = {
  request: (body) => ({
    type: AuthConstants.USER_OTP_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.USER_OTP_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.USER_OTP_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.USER_OTP_ERROR,
    isLoading: isLoading,
  }),
};

export const forgotPassword = {
  request: (body) => ({
    type: AuthConstants.FORGOT_PASSWORD_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.FORGOT_PASSWORD_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.FORGOT_PASSWORD_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.FORGOT_PASSWORD_ERROR,
    isLoading: isLoading,
  }),
};

export const forgotOtpVerify = {
  request: (body) => ({
    type: AuthConstants.FORGOT_OTP_VERIFY_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.FORGOT_OTP_VERIFY_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.FORGOT_OTP_VERIFY_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.FORGOT_OTP_VERIFY_ERROR,
    isLoading: isLoading,
  }),
  open: (isOpen) => ({
    type: AuthConstants.FORGOT_OTP_VERIFY_POP_UP,
    isOpen: isOpen,
  }),
};

export const resetPassword = {
  request: (body, token) => ({
    type: AuthConstants.RESET_PASSWORD_REQUEST,
    body: body,
    token: token,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.RESET_PASSWORD_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.RESET_PASSWORD_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.RESET_PASSWORD_ERROR,
    isLoading: isLoading,
  }),
};

export const changePassword = {
  request: (body) => ({
    type: AuthConstants.CHANGE_PASSWORD_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.CHANGE_PASSWORD_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.CHANGE_PASSWORD_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.CHANGE_PASSWORD_ERROR,
    isLoading: isLoading,
  }),
};

export const updateProfile = {
  request: (body) => ({
    type: AuthConstants.UPDATE_USER_PROFILE_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.UPDATE_USER_PROFILE_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.UPDATE_USER_PROFILE_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.UPDATE_USER_PROFILE_ERROR,
    isLoading: isLoading,
  }),
};

export const imageUpload = {
  request: (body, token) => ({
    type: AuthConstants.IMAGE_UPLOAD_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.IMAGE_UPLOAD_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.IMAGE_UPLOAD_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.IMAGE_UPLOAD_ERROR,
    isLoading: isLoading,
  }),
};

export const user = {
  updateUserData: (data) => ({
    type: AuthConstants.UPDATE_USER_DATA,
    data: data,
  }),
};

export const tempData = {
  updateTempData: (data) => ({
    type: AuthConstants.UPDATE_TEMP_DATA,
    data: data,
  }),
};

export const resetAuth = {
  authorise: () => ({
    type: AuthConstants.UPDATE_AUTHORIZATION,
    isAuthorised: true,
  }),
  unAuthorise: () => ({
    type: AuthConstants.UPDATE_AUTHORIZATION,
    isAuthorised: false,
  }),
};

export const updateWallet = {
  setWalletAddress: (address) => ({
    type: AuthConstants.UPDATE_WALLET_ADDRESS,
    walletAddress: address,
  }),
};

export const createNftForm = {
  request: (body) => ({
    type: AuthConstants.CREATE_NFT_FORM_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.CREATE_NFT_FORM_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.CREATE_NFT_FORM_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.CREATE_NFT_FORM_ERROR,
    isLoading: isLoading,
  }),
};

export const getCategoryAction = {
  request: () => ({
    type: AuthConstants.GET_CATEGORY_REQUEST,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_CATEGORY_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_CATEGORY_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_CATEGORY_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const createCollection = {
  request: (body) => ({
    type: AuthConstants.CREATE_COLLECTION_REQUEST,
    body,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.CREATE_COLLECTION_LOADING,
    isLoading,
  }),
  success: (isLoading) => ({
    type: AuthConstants.CREATE_COLLECTION_SUCCESS,
    isLoading,
  }),
  error: (isLoading) => ({
    type: AuthConstants.CREATE_COLLECTION_ERROR,
    isLoading,
  }),
};

export const getNfts = {
  request: () => ({
    type: AuthConstants.GET_NFT_REQUEST,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_NFT_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_NFT_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_NFT_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const getCollection = {
  request: (data) => ({
    type: AuthConstants.GET_COLLECTION_REQUEST,
    data,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_COLLECTION_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_COLLECTION_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_COLLECTION_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const getNfts_ById = {
  request: (id) => ({
    type: AuthConstants.GET_NFT_BY_ID_REQUEST,
    id,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_NFT_BY_ID_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_NFT_BY_ID_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_NFT_BY_ID_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const getCollection_ById = {
  request: (id) => ({
    type: AuthConstants.GET_COLLECTION_BY_ID_REQUEST,
    id,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_COLLECTION_BY_ID_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_COLLECTION_BY_ID_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_COLLECTION_BY_ID_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const getUserCollection = {
  request: () => ({
    type: AuthConstants.GET_USER_COLLECTION_REQUEST,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_USER_COLLECTION_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_USER_COLLECTION_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_USER_COLLECTION_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const getAppSettingAction = {
  request: (id) => ({
    type: AuthConstants.GET_APP_SETTINGS_REQUEST,
    id,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.GET_APP_SETTINGS_LOADING,
    isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.GET_APP_SETTINGS_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: AuthConstants.GET_APP_SETTINGS_ERROR,
    payload: {},
    error,
    isLoading: false,
  }),
};

export const updateCollection = {
  request: (payload) => ({
    type: AuthConstants.UPDATE_COLLECTION_REQUEST,
    payload: payload,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.UPDATE_COLLECTION_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.UPDATE_COLLECTION_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: AuthConstants.UPDATE_COLLECTION_ERROR,
    isLoading: isLoading,
  }),
};

export const updateNft = {
  request: (payload) => ({
    type: AuthConstants.UPDATE_NFT_REQUEST,
    payload: payload,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.UPDATE_NFT_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.UPDATE_NFT_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: AuthConstants.UPDATE_NFT_ERROR,
    isLoading: isLoading,
  }),
};

export const buyNftAction = {
  request: (payload) => ({
    type: AuthConstants.BUY_NFT_REQUEST,
    payload: payload,
  }),
  loading: (isLoading) => ({
    type: AuthConstants.BUY_NFT_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: AuthConstants.BUY_NFT_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: AuthConstants.BUY_NFT_ERROR,
    isLoading: isLoading,
  }),
};

export const modalVisible = {
  modalOpen: (dialogeType) => ({
    type: AuthConstants.SHOW_DIALOG,
    isOpen: true,
    dialogeType: dialogeType,
  }),
  modalClose: () => ({
    type: AuthConstants.HIDE_DIALOGE,
    isClose: false,
  }),
};
