import axios from 'axios';
import ApiContants from '../contants/ApiContants';
import { authHeader } from '../utils/Generators';
import { getToken } from '../Store';

const AuthRequest = axios.create({
  baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async (user: {username: any; email: any; password: any}) => {
  if (!user?.username || !user.email || !user.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    };
    let registerResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.REGISTER,
      requestBody,
    );
    // const registerResponse = await axios.request({
    //   method: 'POST',
    //   url: 'http://10.0.2.2:3000/api/register',
    //   data: requestBody,
    // });
    return registerResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Opps! something went wrong'};
  }
};

const login = async (user: { username: any; password: any; }) => {
  if (!user?.username || !user.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      username: user?.username,
      password: user?.password,
    };
    let loginResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.LOGIN,
      requestBody,
    );
    return loginResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Opps! something went wrong'};
  }
};

const checkUserExist = async (type: any, value: any) => {
  try {
    let params = {[type]: value};
    let checkUserResponse = await AuthRequest.get(
      ApiContants.BACKEND_API.USER_EXIST,
      {params},
    );
    console.log(checkUserResponse?.data);
    return checkUserResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Opps! something went wrong'};
  }
};

const refreshToken = async () => {
  try {
    let tokenResponse = await AuthRequest.get(
      ApiContants.BACKEND_API.REFRESH_TOKEN,
      {headers: authHeader(getToken())},
    );
    if(tokenResponse.status === 200) {
      console.log(tokenResponse?.data);
      return {
        status: true,
        data: tokenResponse.data,
      };
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Opps! something went wrong'};
  }
};

export default {register, checkUserExist, login, refreshToken};
