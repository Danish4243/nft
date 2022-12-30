import { AuthConstants } from "../constants";

const initialState = {
  isLoading: false,
  categoryData: null,
  nftData: null,
  collectionData: null,
  nftDataById: null,
  collectionDataById: null,
  userCollectionData: null,
  appSettingData: null,
  updateCollectionData: null,
  updateNftData: null,
  buyNftData: null,
};

export const nftReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthConstants.CREATE_NFT_FORM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.CREATE_NFT_FORM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.CREATE_NFT_FORM_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.GET_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryData: action.payload,
      };
    case AuthConstants.GET_CATEGORY_ERROR:
      return {
        ...state,
        categoryData: {},
        error: action.error,
        isLoading: false,
      };
    case AuthConstants.CREATE_COLLECTION_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.CREATE_COLLECTION_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.GET_NFT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_NFT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        nftData: action.payload,
      };
    case AuthConstants.GET_NFT_ERROR:
      return {
        ...state,
        nftData: {},
        error: action.error,
        isLoading: false,
      };

    case AuthConstants.GET_COLLECTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionData: action.payload,
      };
    case AuthConstants.GET_COLLECTION_ERROR:
      return {
        ...state,
        collectionData: {},
        error: action.error,
        isLoading: false,
      };

    case AuthConstants.GET_NFT_BY_ID_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_NFT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        nftDataById: action.payload,
      };
    case AuthConstants.GET_NFT_BY_ID_ERROR:
      return {
        ...state,
        nftDataById: {},
        error: action.error,
        isLoading: false,
      };
    case AuthConstants.GET_COLLECTION_BY_ID_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_COLLECTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionDataById: action.payload,
      };
    case AuthConstants.GET_COLLECTION_BY_ID_ERROR:
      return {
        ...state,
        collectionDataById: {},
        error: action.error,
        isLoading: false,
      };
    case AuthConstants.GET_USER_COLLECTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_USER_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCollectionData: action.payload,
      };
    case AuthConstants.GET_USER_COLLECTION_ERROR:
      return {
        ...state,
        userCollectionData: {},
        error: action.error,
        isLoading: false,
      };

    case AuthConstants.GET_APP_SETTINGS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthConstants.GET_APP_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appSettingData: action.payload,
      };
    case AuthConstants.GET_APP_SETTINGS_ERROR:
      return {
        ...state,
        appSettingData: {},
        error: action.error,
        isLoading: false,
      };

    case AuthConstants.UPDATE_COLLECTION_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.UPDATE_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        updateCollectionData: action.data,
      };
    case AuthConstants.UPDATE_COLLECTION_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case AuthConstants.UPDATE_NFT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.UPDATE_NFT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        updateNftData: action.data,
      };
    case AuthConstants.UPDATE_NFT_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.BUY_NFT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case AuthConstants.BUY_NFT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        buyNftData: action.data,
      };
    case AuthConstants.BUY_NFT_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
