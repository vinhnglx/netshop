import {useContext} from 'react';
import {ProductContext, ProductContextData} from '../contexts/Product';

export const useProduct = (): ProductContextData => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProduct must be used within an ProductProvider');
  }

  return context;
};
