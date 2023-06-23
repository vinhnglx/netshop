import {useQuery} from '@tanstack/react-query';
import {Order} from '../models/Order';
import {OrderService} from '../services/OrderService';

export const useGetOrder = (id: number) => {
  const {isLoading, data} = useQuery<Order>(['order'], () =>
    OrderService.fetchOrder(id),
  );
  return {isLoading, data};
};
