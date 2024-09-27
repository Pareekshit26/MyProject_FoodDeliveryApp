import {
  SET_FIRST_TIME_USE,
  SET_IS_APP_LOADING,
  SET_TOKEN,
  SET_USER_DATA,
} from '../reducers/constants';
import AuthenticationService from '../services/AuthenticationService';
import StorageService from '../services/StorageService';
import UserService from '../services/UserService';

const setisAppLoading = (isAppLoading: any) => {
  return {
    type: SET_IS_APP_LOADING,
    payLoad: isAppLoading,
  };
};

const setToken = (token: any) => {
  return {
    type: SET_TOKEN,
    payLoad: token,
  };
};

const setIsFirstTimeUse = () => {
  return {
    type: SET_FIRST_TIME_USE,
    payLoad: false,
  };
};

const appStart = () => {
  return (dispatch, getState) => {
    StorageService.getFirstTimeUse().then(isFirstTimeUse => {
      dispatch({
        type: SET_FIRST_TIME_USE,
        payLoad: isFirstTimeUse ? false : true,
      });
    });
    StorageService.getToken().then(token => {
      if (token) {
        dispatch({
          type: SET_TOKEN,
          payLoad: token,
        });
        UserService.getUserData().then(userResponse => {
          if (userResponse.status) {
            dispatch({
              type: SET_USER_DATA,
              payLoad: userResponse.data,
            });
            dispatch({
              type: SET_IS_APP_LOADING,
              payLoad: false,
            });
          } else if (userResponse.error.message === 'TokenExpiredError') {
            AuthenticationService.refreshToken().then(tokenResponse => {
              if (tokenResponse.status) {
                dispatch({
                  type: SET_TOKEN,
                  payLoad: tokenResponse.data,
                });
                UserService.getUserData().then(userResponse => {
                  if (userResponse.status) {
                    dispatch({
                      type: SET_USER_DATA,
                      payLoad: userResponse.data,
                    });
                    dispatch({
                      type: SET_IS_APP_LOADING,
                      payLoad: false,
                    });
                  }
                });
              }
              else {
                dispatch({
                  type: SET_TOKEN,
                  payLoad: tokenResponse.data,
                });
                dispatch({
                  type: SET_IS_APP_LOADING,
                  payLoad: false,
                });
              }
            });
          }
        });
      }
    });
    dispatch({
      type: SET_TOKEN,
      payLoad: '',
    });
  };
};

export default {setisAppLoading, setToken, appStart, setIsFirstTimeUse};
