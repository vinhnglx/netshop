import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {CartProvider} from '../contexts/Cart';
import {OrderProvider} from '../contexts/Order';
import {useAuth} from '../hooks/useAuth';
import {GoToCart} from '../hooks/useHeaderBarIcon';
import CartScreen from '../screens/App/CartScreen';
import ProductDetailScreen from '../screens/App/ProductDetailScreen';
import {AppCustomerStack} from './AppCustomerStack';
import {AuthStack} from './AuthStack';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const {loading, authResponse} = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#5B9EE1" />;
  }

  return (
    <NavigationContainer>
      {authResponse ? (
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
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
