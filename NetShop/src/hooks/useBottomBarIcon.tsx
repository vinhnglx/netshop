import React, {useCallback} from 'react';
import {SvgProps} from 'react-native-svg';
import FavouriteIcon from '../components/FavouriteIcon';
import HomeIcon from '../components/HomeIcon';
import NotificationIcon from '../components/NotificationIcon';
import ProfileIcon from '../components/ProfileIcon';

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

  return {
    HomeTabBarIcon,
    FavouriteTabBarIcon,
    NotificationTabBarIcon,
    ProfileTabBarIcon,
  };
};
