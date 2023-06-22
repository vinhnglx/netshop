import {Platform} from 'react-native';
import {
  BASE_API_URL,
  BASE_API_URL_ANDROID,
  axiosInstance,
} from '../util/common';
import {Order} from '../models/Order';

const ORDERS_API_URL =
  Platform.OS === 'ios'
    ? `${BASE_API_URL}/orders`
    : `${BASE_API_URL_ANDROID}/orders`;

const createOrder = async (order: Order) => {
  const response = await axiosInstance.post(ORDERS_API_URL, order);

  return response.data as Order;
};

export const OrderService = {createOrder};
