import {Platform} from 'react-native';
import {Cart} from '../models/Cart';
import {
  BASE_API_URL,
  BASE_API_URL_ANDROID,
  axiosInstance,
} from '../util/common';
import {ProductService} from './ProductService';

const CARTS_API_URL =
  Platform.OS === 'ios'
    ? `${BASE_API_URL}/carts`
    : `${BASE_API_URL_ANDROID}/carts`;

const initCart = async (cart: Cart) => {
  const response = await axiosInstance.post(CARTS_API_URL, cart);

  return response.data as Cart;
};

const updateCart = async (cart: Cart) => {
  const response = await axiosInstance.put(`${CARTS_API_URL}/${cart.id}`, cart);

  return response.data as Cart;
};

const addToCart = async (productId: number, userId: number) => {
  const product = await ProductService.fetchProduct(productId);

  const cartsResponse = await axiosInstance.get(CARTS_API_URL);
  const carts = cartsResponse.data as Cart[];
  const existingCart = carts.find(cart => cart.userId === userId);

  if (!existingCart) {
    const newCartData: Cart = {userId, products: [], totalPrice: 0};
    const newCart = await initCart(newCartData);
    newCart.products.push(product);
    newCart.totalPrice += product.price;

    return await updateCart(newCart);
  } else {
    const productsInCart = existingCart.products;
    const productInCart = productsInCart.find(pro => pro.id === productId);

    if (!productInCart) {
      productsInCart.push(product);
      existingCart.totalPrice += product.price;
    } else {
      existingCart.totalPrice += productInCart.price;
    }
    return await updateCart(existingCart);
  }
};

const getCart = async (userId: number) => {
  const response = await axiosInstance.get(CARTS_API_URL);

  const carts = response.data as Cart[];

  return carts.find(cart => cart.userId === userId);
};

export const CartService = {initCart, addToCart, getCart};
