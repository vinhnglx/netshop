export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD_OUT = 'SOLD_OUT',
}

export interface Product {
  id?: number;
  SKU: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  quantity: number;
  status: ProductStatus;
  bestSeller: boolean;
}
