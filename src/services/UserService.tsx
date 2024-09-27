import axios from 'axios';
import ApiContants from '../contants/ApiContants';
import { authHeader } from '../utils/Generators';
import { getToken } from '../Store';

const getUserData = async () => {
  console.log('get user data -> uesr servie');
  try {
    let body = {
      headers: authHeader(getToken()),
    };

    let userResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-user`,
      body,
    );
    if (userResponse.status === 200) {
      return {
        status: true,
        message: 'User data fetched successfully',
        data: userResponse.data,
      };
    } else {
      return {
        status: false,
        message: 'user data not found',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'user data not found',
    };
  }
};

export default {getUserData};
