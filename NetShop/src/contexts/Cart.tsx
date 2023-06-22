import React, {createContext, useState} from 'react';
import {Cart} from '../models/Cart';
import {CartService} from '../services/CartService';

export type CartContextData = {
  cart?: Cart;
  addToCart: (productId: number, userId: number) => void;
  fetchCart: (cartId: number) => void;
  isProductInCart: (productId: number) => boolean;
};

const initialCartContextData: CartContextData = {
  addToCart: () => {},
  fetchCart: () => {},
  isProductInCart: () => false,
};

const CartContext = createContext<CartContextData>(initialCartContextData);

type Props = {
  children?: React.ReactNode;
};

const CartProvider: React.FC<Props> = ({children}) => {
  const [cart, setCart] = useState<Cart | undefined>();

  const addToCart = async (productId: number, userId: number) => {
    const updatedCart = await CartService.addToCart(productId, userId);
    setCart(updatedCart);
  };

  const fetchCart = async (userId: number) => {
    const fetchedCart = await CartService.getCart(userId);
    setCart(fetchedCart);
  };

  const isProductInCart = (productId?: number) => {
    return Boolean(cart?.products.some(product => product.id === productId));
  };

  return (
    <CartContext.Provider value={{cart, addToCart, fetchCart, isProductInCart}}>
      {children}
    </CartContext.Provider>
  );
};

export {CartProvider, CartContext};
