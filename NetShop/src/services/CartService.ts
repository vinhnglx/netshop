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
    const newCartData: Cart = {
      userId,
      selectProducts: [],
      totalPrice: 0,
    };
    const newCart = await initCart(newCartData);
    const newAddedProduct = {product, quantity: 1};
    newCart.selectProducts.push(newAddedProduct);
    newCart.totalPrice += product.price;

    return await updateCart(newCart);
  } else {
    const productsInCart = existingCart.selectProducts;
    const productInCart = productsInCart.find(
      pro => pro.product?.id === productId,
    );

    if (!productInCart) {
      const newAddedProduct = {product, quantity: 1};
      productsInCart.push(newAddedProduct);
      // existingCart.totalPrice += product.price;
    } else {
      productInCart.quantity += 1;
    }
    existingCart.totalPrice += product.price;
    return await updateCart(existingCart);
  }
};

const increaseProduct = async (cartId: number, productId: number) => {
  const response = await axiosInstance.get(`${CARTS_API_URL}/${cartId}`);

  const cart = response.data as Cart;

  const selectedProduct = cart.selectProducts.find(
    pro => pro.product?.id === productId,
  );

  if (selectedProduct && selectedProduct.product) {
    selectedProduct.quantity += 1;
    cart.totalPrice += selectedProduct.product?.price;
  }

  return await updateCart(cart);
};

const decreaseProduct = async (cartId: number, productId: number) => {
  const response = await axiosInstance.get(`${CARTS_API_URL}/${cartId}`);

  const cart = response.data as Cart;

  const selectedProduct = cart.selectProducts.find(
    pro => pro.product?.id === productId,
  );

  if (selectedProduct && selectedProduct.product) {
    selectedProduct.quantity -= 1;
    cart.totalPrice -= selectedProduct.product?.price;

    if (selectedProduct?.quantity === 0) {
      const index = cart.selectProducts.findIndex(
        pro => pro.product?.id === productId,
      );

      cart.selectProducts.splice(index, 1);
    }
  }

  return await updateCart(cart);
};

const removeCart = async (cartId?: number) => {
  return await axiosInstance.delete(`${CARTS_API_URL}/${cartId}`);
};

const getCart = async (userId: number) => {
  const response = await axiosInstance.get(CARTS_API_URL);

  const carts = response.data as Cart[];

  return carts.find(cart => cart.userId === userId);
};

export const CartService = {
  initCart,
  addToCart,
  getCart,
  increaseProduct,
  decreaseProduct,
  removeCart,
};
