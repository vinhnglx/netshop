import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {CartProvider} from '../contexts/Cart';
import {OrderProvider} from '../contexts/Order';
import {ProductProvider} from '../contexts/Product';
import {useAuth} from '../hooks/useAuth';
import {GoToCart} from '../hooks/useHeaderBarIcon';
import {UserRole} from '../models/User';
import CartScreen from '../screens/App/CartScreen';
import EditProductScreen from '../screens/App/EditProductScreen';
import OrderDetailScreen from '../screens/App/OrderDetailScreen';
import ProductDetailScreen from '../screens/App/ProductDetailScreen';
import {AppAdminStack} from './AppAdminStack';
import {AppCustomerStack} from './AppCustomerStack';
import {AuthStack} from './AuthStack';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const {loading, authResponse} = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#5B9EE1" />;
  }

  const renderCustomerStack = () => (
    <CartProvider>
      <OrderProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={AppCustomerStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              title: '',
              headerBackTitle: '',
              headerRight: GoToCart,
            }}
          />
          <Stack.Screen
            name="CartCheckOut"
            component={CartScreen}
            options={{title: 'Checkout', headerBackTitle: ''}}
          />
        </Stack.Navigator>
      </OrderProvider>
    </CartProvider>
  );

  const renderAdminStack = () => (
    <ProductProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="AdminTabs"
          component={AppAdminStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{
            title: '',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="EditProductDetail"
          component={EditProductScreen}
          options={{
            title: '',
            headerBackTitle: '',
          }}
        />
      </Stack.Navigator>
    </ProductProvider>
  );

  return (
    <NavigationContainer>
      {authResponse ? (
        authResponse.role === UserRole.CUSTOMER ? (
          renderCustomerStack()
        ) : authResponse.role === UserRole.ADMIN ? (
          renderAdminStack()
        ) : (
          <AuthStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
