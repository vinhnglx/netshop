import {SelectedProduct} from './Cart';
import {User} from './User';

export interface Order {
  id?: number;
  userId?: number;
  selectedProducts?: SelectedProduct[];
  deliveryDate: Date;
  totalPrice: number;
  createdAt: Date;
  deliveryAddress: string;
  receiver: Pick<
    User,
    Exclude<keyof User, 'role' | 'password' | 'id' | 'username'>
  >;
}
