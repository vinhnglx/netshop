import {AxiosResponse} from 'axios';
import {addDays} from 'date-fns';
import * as ReactNative from 'react-native';
import {Order} from '../src/models/Order';
import {ProductStatus} from '../src/models/Product';
import {OrderService} from '../src/services/OrderService';
import {axiosInstance} from '../src/util/common';

jest.mock('../src/util/common', () => ({
  axiosInstance: {
    post: jest.fn(),
    get: jest.fn(),
  },
  BASE_API_URL: 'http://localhost:3000',
}));

export const Platform = {
  ...ReactNative.Platform,
  OS: 'ios',
  Version: 123,
  isTesting: true,
};

export default Object.setPrototypeOf(
  {
    Platform,
  },
  ReactNative,
);

describe('OrderService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('creating', () => {
    let responseData: Order;

    beforeAll(() => {
      responseData = {
        userId: 1,
        receiver: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
        },
        selectedProducts: [
          {
            product: {
              name: 'Product 5',
              description:
                'This is a medium-length description for Product 5. It provides some key features and benefits of the product.',
              price: 59.99,
              imageURL: 'https://picsum.photos/400',
              quantity: 8,
              status: ProductStatus.AVAILABLE,
              sku: 'SKU005',
              bestSeller: false,
              id: 5,
            },
            quantity: 3,
          },
        ],
        deliveryAddress: 'Hamilton New Zealand',
        totalPrice: 179.97,
        createdAt: new Date(),
        deliveryDate: addDays(new Date(), 7),
        id: 1,
      };
      jest
        .spyOn(axiosInstance, 'post')
        .mockResolvedValueOnce({data: responseData} as AxiosResponse<Order>);
    });

    it('return a new order', async () => {
      const orderData = {
        userId: 1,
        receiver: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
        },
        selectedProducts: [
          {
            product: {
              name: 'Product 5',
              description:
                'This is a medium-length description for Product 5. It provides some key features and benefits of the product.',
              price: 59.99,
              imageURL: 'https://picsum.photos/400',
              quantity: 8,
              status: ProductStatus.AVAILABLE,
              sku: 'SKU005',
              bestSeller: false,
              id: 5,
            },
            quantity: 3,
          },
        ],
        deliveryAddress: 'Hamilton New Zealand',
        totalPrice: 179.97,
        createdAt: new Date(),
        deliveryDate: addDays(new Date(), 7),
      };

      const createdOrder = await OrderService.createOrder(orderData);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        'http://localhost:3000/orders',
        orderData,
      );
      expect(createdOrder).toEqual(responseData);
    });
  });

  describe('fetchingAll', () => {
    let responseData: Order[];

    beforeAll(() => {
      responseData = [
        {
          userId: 1,
          receiver: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
          },
          selectedProducts: [
            {
              product: {
                name: 'Product 5',
                description:
                  'This is a medium-length description for Product 5. It provides some key features and benefits of the product.',
                price: 59.99,
                imageURL: 'https://picsum.photos/400',
                quantity: 8,
                status: ProductStatus.AVAILABLE,
                sku: 'SKU005',
                bestSeller: false,
                id: 5,
              },
              quantity: 3,
            },
          ],
          deliveryAddress: 'Hamilton New Zealand',
          totalPrice: 179.97,
          createdAt: new Date(),
          deliveryDate: addDays(new Date(), 7),
          id: 1,
        },
      ];
      jest
        .spyOn(axiosInstance, 'get')
        .mockResolvedValueOnce({data: responseData} as AxiosResponse<Order[]>);
    });

    it('return list of orders', async () => {
      const fetchOrders = await OrderService.fetchOrders();

      expect(axiosInstance.get).toHaveBeenCalledWith(
        'http://localhost:3000/orders',
      );
      expect(fetchOrders).toEqual(responseData);
    });
  });

  describe('fetchOne', () => {
    let responseData: Order;

    beforeAll(() => {
      responseData = {
        userId: 1,
        receiver: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
        },
        selectedProducts: [
          {
            product: {
              name: 'Product 5',
              description:
                'This is a medium-length description for Product 5. It provides some key features and benefits of the product.',
              price: 59.99,
              imageURL: 'https://picsum.photos/400',
              quantity: 8,
              status: ProductStatus.AVAILABLE,
              sku: 'SKU005',
              bestSeller: false,
              id: 5,
            },
            quantity: 3,
          },
        ],
        deliveryAddress: 'Hamilton New Zealand',
        totalPrice: 179.97,
        createdAt: new Date(),
        deliveryDate: addDays(new Date(), 7),
        id: 1,
      };
      jest
        .spyOn(axiosInstance, 'get')
        .mockResolvedValueOnce({data: responseData} as AxiosResponse<Order>);
    });

    it('return an order detail', async () => {
      const fetchOrders = await OrderService.fetchOrder(1);

      expect(axiosInstance.get).toHaveBeenCalledWith(
        'http://localhost:3000/orders/1',
      );
      expect(fetchOrders).toEqual(responseData);
    });
  });
});
