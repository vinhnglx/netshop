import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useBottomBarIcon} from '../hooks/useBottomBarIcon';
import {useCart} from '../hooks/useCart';
import {useHeaderBarIcon} from '../hooks/useHeaderBarIcon';
import FavouriteScreen from '../screens/App/FavouriteScreen';
import HomeScreen from '../screens/App/HomeScreen';
import NotificationScreen from '../screens/App/NotificationScreen';
import ProfileScreen from '../screens/App/ProfileScreen';

const Tab = createBottomTabNavigator();

export const AppCustomerStack = () => {
  const {
    HomeTabBarIcon,
    NotificationTabBarIcon,
    FavouriteTabBarIcon,
    ProfileTabBarIcon,
  } = useBottomBarIcon();

  const {CartButtonIcon, ClearAllButton, CartActiveButtonIcon} =
    useHeaderBarIcon();

  const {cart} = useCart();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#5B9EE1',
        title: '',
        headerStyle: {
          backgroundColor: '#F8F9FA',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabBarIcon,
          headerRight: cart ? CartActiveButtonIcon : CartButtonIcon,
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: FavouriteTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: NotificationTabBarIcon,
          headerRight: ClearAllButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};
