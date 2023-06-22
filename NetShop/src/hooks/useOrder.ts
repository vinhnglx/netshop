import {useContext} from 'react';
import {OrderContext, OrderContextData} from '../contexts/Order';

export const useOrder = (): OrderContextData => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }

  return context;
};
