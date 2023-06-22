import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {AppCustomerStackParamList} from '../../App';
import CartActiveIcon from '../components/CartActiveIcon';
import CartIcon from '../components/CartIcon';
import {useCart} from './useCart';

const styles = StyleSheet.create({
  right: {
    marginRight: 20,
    marginBottom: 10,
  },
});

type CartProps = {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
};

export const useHeaderBarIcon = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppCustomerStackParamList, 'CartCheckOut'>
    >();

  const CartButtonIcon = useCallback(
    (props: CartProps) => <CartIcon {...props} style={styles.right} />,
    [],
  );

  const CartActiveButtonIcon = useCallback(
    (props: CartProps) => (
      <CartActiveIcon
        {...props}
        style={styles.right}
        onPress={() => navigation.navigate('CartCheckOut')}
      />
    ),
    [navigation],
  );

  const ClearAllButton = useCallback(
    () => <Button title="Clear All" size="sm" type="clear" />,
    [],
  );

  return {
    CartButtonIcon,
    ClearAllButton,
    CartActiveButtonIcon,
  };
};

export const GoToCart = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppCustomerStackParamList, 'CartCheckOut'>
    >();

  const {cart} = useCart();

  if (cart) {
    return (
      <CartActiveIcon
        style={styles.right}
        onPress={() => navigation.navigate('CartCheckOut')}
      />
    );
  }

  return <CartIcon style={styles.right} />;
};
