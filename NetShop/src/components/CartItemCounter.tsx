import {Button, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useCart} from '../hooks/useCart';

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});

export const CartItemCounter = ({
  quantity,
  productId,
  cartId,
}: {
  quantity: number;
  productId?: number;
  cartId?: number;
}) => {
  const {increaseProductItem, decreaseProductItem} = useCart();

  const handleIncrement = () => {
    if (cartId && productId) {
      increaseProductItem(cartId, productId);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0 && cartId && productId) {
      decreaseProductItem(cartId, productId);
    }
  };

  return (
    <View style={styles.counter}>
      <Button title="-" onPress={handleDecrement} size="sm" color="secondary" />
      <Text>{quantity}</Text>
      <Button title="+" onPress={handleIncrement} size="sm" color="secondary" />
    </View>
  );
};
