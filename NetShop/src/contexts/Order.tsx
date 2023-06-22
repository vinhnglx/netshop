import React, {createContext, useState} from 'react';

export type OrderContextData = {
  newOrder: boolean;
  setOrderStatus: (status: boolean) => void;
};

const initialOrderContextData: OrderContextData = {
  newOrder: false,
  setOrderStatus: () => {},
};

const OrderContext = createContext<OrderContextData>(initialOrderContextData);

type Props = {
  children?: React.ReactNode;
};

const OrderProvider: React.FC<Props> = ({children}) => {
  const [newOrder, setNewOrder] = useState(false);

  const setOrderStatus = (status: boolean) => {
    setNewOrder(status);
  };

  const value = {
    newOrder,
    setOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export {OrderContext, OrderProvider};
