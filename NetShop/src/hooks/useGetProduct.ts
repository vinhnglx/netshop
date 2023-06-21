import {useQuery} from '@tanstack/react-query';
import {ProductService} from '../services/ProductService';
import {Product} from '../models/Product';

export const useGetProduct = (id: number) => {
  const {isLoading, data} = useQuery<Product>(['product'], () =>
    ProductService.fetchProduct(id),
  );
  return {isLoading, data};
};
