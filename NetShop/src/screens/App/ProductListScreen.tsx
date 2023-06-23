import {ListItem} from '@rneui/themed';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {useProduct} from '../../hooks/useProduct';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppAdminStackParamList} from '../../../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 25,
  },
  listTitle: {
    marginBottom: 10,
  },
});

const ProductListScreen = () => {
  const {fetchProducts, products} = useProduct();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppAdminStackParamList, 'EditProductDetail'>
    >();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={[styles.container]}>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <ListItem
            key={index}
            onPress={() =>
              navigation.navigate('EditProductDetail', {id: product.id})
            }
            Component={TouchableHighlight}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>
                {product.name}
              </ListItem.Title>
              <ListItem.Subtitle>${product.price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <ActivityIndicator size="large" color="#5B9EE1" />
      )}
    </ScrollView>
  );
};

export default ProductListScreen;
