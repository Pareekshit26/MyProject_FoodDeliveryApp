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
  return async (dispatch, getState) => {
    try {
      // Get if it's the first time the user is using the app
      const isFirstTimeUse = await StorageService.getFirstTimeUse();
      dispatch({
        type: SET_FIRST_TIME_USE,
        payLoad: !isFirstTimeUse,
      });

      // Get the token from storage
      const token = await StorageService.getToken();
      if (token) {
        dispatch({
          type: SET_TOKEN,
          payLoad: token,
        });

        // Try fetching user data
        const userResponse = await UserService.getUserData();
        if (userResponse.status) {
          dispatch({
            type: SET_USER_DATA,
            payLoad: userResponse.data,
          });
        } else if (userResponse.error?.message === 'TokenExpiredError') {
          // Handle token expiration
          const tokenResponse = await AuthenticationService.refreshToken();
          if (tokenResponse.status) {
            dispatch({
              type: SET_TOKEN,
              payLoad: tokenResponse.data,
            });
            const refreshedUserResponse = await UserService.getUserData();
            if (refreshedUserResponse.status) {
              dispatch({
                type: SET_USER_DATA,
                payLoad: refreshedUserResponse.data,
              });
            }
          }
        }
      } else {
        // No token found, reset to empty string
        dispatch({
          type: SET_TOKEN,
          payLoad: '',
        });
      }
    } catch (error) {
      console.error('Error during app start:', error);
    } finally {
      // Ensure isAppLoading is set to false at the end
      dispatch({
        type: SET_IS_APP_LOADING,
        payLoad: false,
      });
    }
  };
};

export default {setisAppLoading, setToken, appStart, setIsFirstTimeUse};
