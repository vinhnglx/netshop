import React, {useCallback} from 'react';
import {SvgProps} from 'react-native-svg';
import FavouriteIcon from '../components/FavouriteIcon';
import HomeIcon from '../components/HomeIcon';
import NotificationIcon from '../components/NotificationIcon';
import ProfileIcon from '../components/ProfileIcon';
import OrderListIcon from '../components/OrderListIcon';
import ProductListIcon from '../components/ProductListIcon';

export const useBottomBarIcon = () => {
  const HomeTabBarIcon = useCallback(
    (props: SvgProps) => <HomeIcon {...props} />,
    [],
  );

  const FavouriteTabBarIcon = useCallback(
    (props: SvgProps) => <FavouriteIcon {...props} />,
    [],
  );

  const NotificationTabBarIcon = useCallback(
    (props: SvgProps) => <NotificationIcon {...props} />,
    [],
  );

  const ProfileTabBarIcon = useCallback(
    (props: SvgProps) => <ProfileIcon {...props} />,
    [],
  );

  const OrderListTabBarIcon = useCallback(
    (props: SvgProps) => <OrderListIcon {...props} />,
    [],
  );

  const ProductListTabBarIcon = useCallback(
    (props: SvgProps) => <ProductListIcon {...props} />,
    [],
  );

  return {
    HomeTabBarIcon,
    FavouriteTabBarIcon,
    NotificationTabBarIcon,
    ProfileTabBarIcon,
    OrderListTabBarIcon,
    ProductListTabBarIcon,
  };
};
