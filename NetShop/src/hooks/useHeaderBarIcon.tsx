import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import CartActiveIcon from '../components/CartActiveIcon';
import CartIcon from '../components/CartIcon';

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
  const CartButtonIcon = useCallback(
    (props: CartProps) => <CartIcon {...props} style={styles.right} />,
    [],
  );

  const CartActiveButtonIcon = useCallback(
    (props: CartProps) => <CartActiveIcon {...props} style={styles.right} />,
    [],
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
