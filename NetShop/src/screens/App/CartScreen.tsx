import {Button, Input, Text} from '@rneui/themed';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useCart} from '../../hooks/useCart';
import {SelectedProduct} from '../../models/Cart';
import {useNavigation} from '@react-navigation/native';
import {CartItem} from '../../components/CartItem';
import {useGetUser} from '../../hooks/useGetUser';
import {Controller, useForm} from 'react-hook-form';
import {checkoutSchema} from '../../models/Cart.validation';
import {yupResolver} from '@hookform/resolvers/yup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
  input: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  information: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  price: {
    fontSize: 17,
    color: '#5B9EE1',
  },
});

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  deliveryAddress: string;
};

const CartScreen = () => {
  const {cart} = useCart();
  const navigation = useNavigation();

  const products = cart?.selectProducts;

  useEffect(() => {
    if (!cart) {
      navigation.goBack();
    }
  }, [cart, navigation]);

  const {data: user} = useGetUser(cart?.userId);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: CheckoutFormData) => {
    console.log('data', data);
  };

  return (
    <ScrollView style={[styles.container]}>
      {cart && products?.length && (
        <>
          {products.map((pro: SelectedProduct, index: number) => (
            <CartItem
              key={index}
              product={pro.product}
              quantity={pro.quantity}
              cartId={cart.id}
            />
          ))}
          <View style={styles.information}>
            <Text style={styles.price}>
              Total: $
              {Math.round(cart?.totalPrice * 100 + Number.EPSILON) / 100}
            </Text>
          </View>

          <View style={styles.information}>
            <Text h4>Checkout Information</Text>

            <Controller
              control={control}
              name={'firstName'}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={
                    errors.firstName ? errors.firstName.message : ''
                  }
                />
              )}
            />
            <Controller
              control={control}
              name={'lastName'}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.lastName ? errors.lastName.message : ''}
                />
              )}
            />
            <Controller
              control={control}
              name={'email'}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              control={control}
              name={'deliveryAddress'}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Delivery Address"
                  placeholder="Hamilton, New Zealand"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={
                    errors.deliveryAddress ? errors.deliveryAddress.message : ''
                  }
                />
              )}
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default CartScreen;
