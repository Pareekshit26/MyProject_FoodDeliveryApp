import {
  SET_FIRST_TIME_USE,
  SET_IS_APP_LOADING,
  SET_TOKEN,
  SET_USER_DATA,
} from './constants';

const initialState = {
  isAppLoading: true,
  token: '',
  isFirstTimeUse: true,
  userData: {},
};

const GeneralReducer = (
  state = initialState,
  action: {type: any; payLoad: any},
) => {
  switch (action.type) {
    case SET_IS_APP_LOADING:
      return {...state, isAppLoading: action.payLoad};

    case SET_TOKEN:
      return {...state, token: action.payLoad};

    case SET_FIRST_TIME_USE:
      return {...state, isFirstTimeUse: action.payLoad};

    case SET_USER_DATA:
      return {...state, userData: action.payLoad};

    default:
      return state;
  }
};

export default GeneralReducer;
