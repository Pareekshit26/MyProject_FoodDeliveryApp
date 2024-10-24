import axios from 'axios';
import ApiContants from '../contants/ApiContants';
import {authHeader} from '../utils/Generators';
import {getToken} from '../Store';

const getRestaurantData = async () => {
  console.log('Restaurant Service');
  const apiUrl = `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.RESTAURANT}`;
  try {
    let restaurantData = await axios.get(apiUrl, {
      headers: authHeader(getToken()),
    });
    if (restaurantData.status === 200) {
      return {
        status: true,
        message: 'Restaurant data fetched successfully',
        data: restaurantData.data.data,
      };
    } else {
      return {
        status: false,
        message: 'Restaurant data not found',
      };
    }
  } catch (error) {
    console.error('Error fetching restaurant data:', error);

    return {
      status: false,
      message: 'Restaurant data not found',
    };
  }
};

const getOneRestaurantById = async restaurantId => {
  console.log('RestaurantsService | getOneRestaurantById');
  try {
    let restaurantResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.RESTAURANT}/${restaurantId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: 'Restaurant data fetched',
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: 'Restaurant data not found',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Restaurant data not found',
    };
  }
};

export default {getRestaurantData, getOneRestaurantById};
