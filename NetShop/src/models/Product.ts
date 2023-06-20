enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD_OUT = 'SOLD_OUT',
}

export interface Product {
  sku: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quanity: number;
  status: ProductStatus;
  bestSeller: boolean;
}
