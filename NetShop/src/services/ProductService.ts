import {Platform} from 'react-native';
import {
  BASE_API_URL,
  BASE_API_URL_ANDROID,
  axiosInstance,
} from '../util/common';

const PRODUCTS_API_URL =
  Platform.OS === 'ios'
    ? `${BASE_API_URL}/products`
    : `${BASE_API_URL_ANDROID}/products`;

const fetchProducts = async () => {
  const response = await axiosInstance.get(PRODUCTS_API_URL);
  return response.data;
};

export const ProductService = {fetchProducts};
