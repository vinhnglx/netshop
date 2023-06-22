import React from 'react';
import {useBottomBarIcon} from '../hooks/useBottomBarIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrderListScreen from '../screens/App/OrderListScreen';
import ProductListScreen from '../screens/App/ProductListScreen';

const Tab = createBottomTabNavigator();

export const AppAdminStack = () => {
  const {ProductListTabBarIcon, OrderListTabBarIcon} = useBottomBarIcon();

  return (
    <Tab.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarActiveTintColor: '#5B9EE1',
        headerStyle: {
          backgroundColor: '#F8F9FA',
        },
      }}>
      <Tab.Screen
        name="Orders"
        component={OrderListScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: OrderListTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ProductListTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};
