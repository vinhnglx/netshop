import React, {createContext, useState} from 'react';
import {Product} from '../models/Product';
import {ProductService} from '../services/ProductService';

export type ProductContextData = {
  products?: Product[];
  fetchProducts: () => void;
  updateProduct: (product: Partial<Product>) => void;
};

const initialProductContextData: ProductContextData = {
  fetchProducts: () => {},
  updateProduct: () => {},
};

const ProductContext = createContext<ProductContextData>(
  initialProductContextData,
);

type Props = {
  children?: React.ReactNode;
};

const ProductProvider: React.FC<Props> = ({children}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const productsData = await ProductService.fetchProducts();
    setProducts(productsData);
  };

  const updateProduct = async (product: Partial<Product>) => {
    const updatedProduct = await ProductService.updateProduct(product);

    if (updatedProduct) {
      setProducts(prevProducts => {
        return prevProducts.map(pro => {
          if (pro.id === updatedProduct.id) {
            return {
              ...pro,
              ...updatedProduct,
            };
          }
          return pro;
        });
      });
    }
  };

  return (
    <ProductContext.Provider value={{products, fetchProducts, updateProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

export {ProductProvider, ProductContext};
