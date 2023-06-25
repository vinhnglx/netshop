import {useRoute} from '@react-navigation/native';
import {Button, Image, Text} from '@rneui/themed';
import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {useFetchCart} from '../../hooks/useFetchCart';
import {useGetProduct} from '../../hooks/useGetProduct';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingTop: 25,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  centerItem: {
    flex: 1,
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  product: {
    padding: 20,
  },
  pricing: {
    marginTop: 10,
    marginBottom: 10,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featured: {
    color: '#5B9EE1',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#707B81',
    fontSize: 15,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  footerPrice: {
    color: '#707B81',
    fontSize: 17,
    marginBottom: 5,
  },
  addToCartCta: {
    borderRadius: 20,
  },
});

type RouteParams = {
  id: number;
};

const ProductDetailScreen = () => {
  useFetchCart();
  const route = useRoute();
  const {id} = route.params as RouteParams;

  const {data: product, isLoading} = useGetProduct(id);

  const {isProductInCart, userId, addToCart} = useFetchCart();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#5B9EE1" />
      ) : product ? (
        <>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.centerItem}>
              <Image source={{uri: product?.imageURL}} style={styles.image} />
            </View>

            <View style={styles.product}>
              {product.bestSeller && (
                <Text style={styles.featured}>BEST SELLER</Text>
              )}
              <Text h3 h3Style={styles.productName}>
                {product.name}
              </Text>
              <Text>SKU: {product.SKU}</Text>
              <Text h4 h4Style={styles.pricing}>
                ${product.price}
              </Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.flex1}>
              <Text style={styles.footerPrice}>Price</Text>
              <Text h3>${product.price}</Text>
            </View>
            <View style={styles.flex1}>
              {product.id && (
                <Button
                  disabled={isProductInCart(product.id)}
                  size="lg"
                  buttonStyle={styles.addToCartCta}
                  onPress={async () => {
                    if (userId && product.id) {
                      await addToCart(product.id, userId);
                    }
                  }}>
                  {isProductInCart(product.id)
                    ? 'Added To Cart'
                    : 'Add To Cart'}
                </Button>
              )}
            </View>
          </View>
        </>
      ) : (
        <Text>No product</Text>
      )}
    </View>
  );
};

export default ProductDetailScreen;
