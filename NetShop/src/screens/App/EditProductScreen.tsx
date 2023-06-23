import {yupResolver} from '@hookform/resolvers/yup';
import {useRoute} from '@react-navigation/native';
import {Button, Dialog, Input, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useGetProduct} from '../../hooks/useGetProduct';
import {useProduct} from '../../hooks/useProduct';
import {productSchema} from '../../models/Product.validation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    marginBottom: 20,
  },
});

type RouteParams = {
  id: number;
};

type ProductFormData = {
  name: string;
  description: string;
  quantity: number;
  price: number;
};

const EditProductScreen = () => {
  const route = useRoute();
  const {id} = route.params as RouteParams;

  const {data: product} = useGetProduct(id);
  const {updateProduct} = useProduct();

  const [newProductVisible, setNewProductVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    await updateProduct({...data, id});
    setNewProductVisible(true);
  };

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('quantity', product.quantity);
    }
  }, [product, setValue]);

  return (
    <View style={styles.container}>
      <Text h4 h4Style={styles.title}>
        Product Detail
      </Text>

      {product && (
        <>
          <Controller
            control={control}
            name={'name'}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Name"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            control={control}
            name={'description'}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Description"
                autoCapitalize="none"
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={
                  errors.description ? errors.description.message : ''
                }
              />
            )}
          />
          <Controller
            control={control}
            name={'price'}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Price"
                keyboardType="decimal-pad"
                onBlur={onBlur}
                onChangeText={text => onChange(Number(text))}
                value={value ? value.toString() : ''}
                errorMessage={errors.price ? errors.price.message : ''}
              />
            )}
          />
          <Controller
            control={control}
            name={'quantity'}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Quantity"
                keyboardType="numeric"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={text => onChange(Number(text))}
                value={value ? value.toString() : ''}
                errorMessage={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </>
      )}

      <Dialog
        isVisible={newProductVisible}
        onBackdropPress={() => setNewProductVisible(false)}>
        <Dialog.Title title="Congratulations" />
        <Text>The product has been updated successfully.</Text>
      </Dialog>
    </View>
  );
};

export default EditProductScreen;
