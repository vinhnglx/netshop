import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Input, Text} from '@rneui/themed';
import {addDays} from 'date-fns';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppCustomerStackParamList} from '../../../App';
import {CartItem} from '../../components/CartItem';
import {useCart} from '../../hooks/useCart';
import {useGetUser} from '../../hooks/useGetUser';
import {useOrder} from '../../hooks/useOrder';
import {SelectedProduct} from '../../models/Cart';
import {checkoutSchema} from '../../models/Cart.validation';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/OrderService';
import {ProductService} from '../../services/ProductService';

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
  const {cart, removeCart} = useCart();
  const {setOrderStatus} = useOrder();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppCustomerStackParamList, 'Home'>
    >();

  const products = cart?.selectProducts;

  useEffect(() => {
    if (!cart) {
      navigation.navigate('Home');
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
    if (cart?.selectProducts) {
      const currentDate = new Date();
      const deliveryDate = addDays(currentDate, 7);

      const order: Order = {
        userId: user?.id,
        receiver: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        selectedProducts: cart?.selectProducts,
        deliveryAddress: data.deliveryAddress,
        totalPrice: cart.totalPrice,
        createdAt: currentDate,
        deliveryDate,
      };

      await OrderService.createOrder(order);
      await removeCart(cart?.id);
      await ProductService.updateProductQuantity(cart?.selectProducts);

      setOrderStatus(true);
    }
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
