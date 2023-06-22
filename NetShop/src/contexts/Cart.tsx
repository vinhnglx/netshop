import React, {createContext, useState} from 'react';
import {Cart} from '../models/Cart';
import {CartService} from '../services/CartService';

export type CartContextData = {
  cart?: Cart;
  addToCart: (productId: number, userId: number) => void;
  fetchCart: (cartId: number) => void;
  isProductInCart: (productId: number) => boolean;
  increaseProductItem: (cartId: number, productId: number) => void;
  decreaseProductItem: (cartId: number, productId: number) => void;
};

const initialCartContextData: CartContextData = {
  addToCart: () => {},
  fetchCart: () => {},
  isProductInCart: () => false,
  increaseProductItem: () => {},
  decreaseProductItem: () => {},
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
    return Boolean(
      cart?.selectProducts.some(pro => pro.product?.id === productId),
    );
  };

  const increaseProductItem = async (cartId: number, productId: number) => {
    const updatedCart = await CartService.increaseProduct(cartId, productId);
    setCart(updatedCart);
  };

  const decreaseProductItem = async (cartId: number, productId: number) => {
    const updatedCart = await CartService.decreaseProduct(cartId, productId);
    if (updatedCart.selectProducts.length > 0) {
      setCart(updatedCart);
    } else {
      await CartService.removeCart(updatedCart.id);
      setCart(undefined);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        fetchCart,
        isProductInCart,
        increaseProductItem,
        decreaseProductItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export {CartProvider, CartContext};
