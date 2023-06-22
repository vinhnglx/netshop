enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD_OUT = 'SOLD_OUT',
}

export interface Product {
  id?: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  quantity: number;
  status: ProductStatus;
  bestSeller: boolean;
}
