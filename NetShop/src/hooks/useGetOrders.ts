import {useQuery} from '@tanstack/react-query';
import {Order} from '../models/Order';
import {OrderService} from '../services/OrderService';

export const useGetOrders = () => {
  const {isLoading, data} = useQuery<Order[]>(
    ['allOrders'],
    OrderService.fetchOrders,
  );
  return {isLoading, data};
};
