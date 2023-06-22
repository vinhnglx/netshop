import {Product} from './Product';

export interface SelectedProduct {
  product?: Product;
  quantity: number;
}

export interface Cart {
  id?: number;
  userId: number;
  selectProducts: SelectedProduct[];
  totalPrice: number;
}
