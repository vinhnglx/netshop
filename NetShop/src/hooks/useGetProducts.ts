import {useQuery} from '@tanstack/react-query';
import {ProductService} from '../services/ProductService';
import {Product} from '../models/Product';

export const useGetProducts = () => {
  const {isLoading, data} = useQuery<Product[]>(
    ['allProducts'],
    ProductService.fetchProducts,
  );
  return {isLoading, data};
};
