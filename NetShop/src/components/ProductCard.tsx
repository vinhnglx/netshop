import {Card, Image, Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Product} from '../models/Product';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppCustomerStackParamList} from '../../App';

const styles = StyleSheet.create({
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

export const ProductCard = (props: Product & {index: number}) => {
  const {name, price, bestSeller, index, imageURL, id} = props;

  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppCustomerStackParamList, 'ProductDetail'>
    >();

  return (
    <Card key={index} containerStyle={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', {id})}>
        <Card.Title>
          <Image
            source={{
              uri: imageURL,
            }}
            style={styles.image}
          />
        </Card.Title>
        <Card.Divider />
        {bestSeller && (
          <Card.FeaturedSubtitle>
            <Text style={styles.featured}>BEST SELLER</Text>
          </Card.FeaturedSubtitle>
        )}
        <Text h4 h4Style={styles.productName}>
          {name}
        </Text>
        <Text style={styles.pricing}>{price}</Text>
      </TouchableOpacity>
    </Card>
  );
};
