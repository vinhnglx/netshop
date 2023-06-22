import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Product} from '../models/Product';
import {Text} from '@rneui/themed';
import {CartItemCounter} from './CartItemCounter';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  flex2: {
    flex: 2,
  },
  flex1: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
  },
});

export const CartItem = ({
  product,
  quantity,
  cartId,
}: {
  product?: Product;
  quantity: number;
  cartId?: number;
}) => {
  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.flex2]}>
        <Text style={styles.label}>{product?.name}</Text>
        <Text style={styles.label}>${product?.price}</Text>
      </View>
      <View style={[styles.column, styles.flex1]}>
        <CartItemCounter
          quantity={quantity}
          cartId={cartId}
          productId={product?.id}
        />
      </View>
    </View>
  );
};
