import {Text} from '@rneui/themed';
import {chunk} from 'lodash';
import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {ProductCard} from '../../components/ProductCard';
import {useFetchCart} from '../../hooks/useFetchCart';
import {useGetProducts} from '../../hooks/useGetProducts';
import {useSafeAreaPadding} from '../../hooks/useSafeAreaPadding';
import {Product} from '../../models/Product';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 25,
  },
  list: {
    marginTop: 25,
  },
  heading: {
    marginLeft: 15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowWithoutCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    borderRadius: 16,
    elevation: 0,
    borderWidth: 0,
    shadowColor: 'rgba(0,0,0, 0.0)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  image: {
    width: 120,
    height: 120,
  },
  pricing: {
    marginTop: 5,
  },
  productName: {
    fontWeight: 'bold',
  },
  featured: {
    color: '#5B9EE1',
    fontWeight: 'bold',
  },
});

const HomeScreen = () => {
  const insets = useSafeAreaPadding();

  const {data, isLoading} = useGetProducts();

  useFetchCart();

  const renderRow = (rowProducts: Product[], rowIndex: number) => (
    <View
      key={`row_${rowIndex}`}
      style={rowProducts.length === 2 ? styles.row : styles.rowWithoutCenter}>
      {rowProducts?.map((product, index) => (
        <ProductCard key={`product_${index}`} {...product} index={index} />
      ))}
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={[insets, styles.container]}>
      <View style={styles.list}>
        <Text h4 h4Style={styles.heading}>
          Popular Shoes
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#5B9EE1" />
        ) : data && data.length > 0 ? (
          <>{chunk(data, 2).map(renderRow)}</>
        ) : (
          <Text>Whoops, No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
