import {useEffect} from 'react';
import {useAuth} from './useAuth';
import {useCart} from './useCart';

export const useFetchCart = () => {
  const {fetchCart, isProductInCart, addToCart} = useCart();
  const {authResponse} = useAuth();

  const userId = authResponse?.userId;

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    isProductInCart,
    userId,
    addToCart,
  };
};
