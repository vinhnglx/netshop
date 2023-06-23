import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/contexts/Auth';
import {Router} from './src/router/Router';

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AppCustomerStackParamList = {
  Home: undefined;
  ProductDetail: {id: number | undefined};
  CartCheckOut: undefined;
};

export type AppAdminStackParamList = {
  OrderDetail: {id: number | undefined};
  EditProductDetail: {id: number | undefined};
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
