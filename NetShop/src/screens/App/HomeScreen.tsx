import React from 'react';
import {useSafeAreaPadding} from '../../hooks/useSafeAreaPadding';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {chunk} from 'lodash';
import {Card, Image, Text} from '@rneui/themed';
import {useGetProducts} from '../../hooks/useGetProducts';
import {ProductService} from '../../services/ProductService';

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

  console.log('dat12a', data);

  const renderRow = () => (
    <>
      {data?.map((product, index) => (
        <Card key={index} containerStyle={styles.card}>
          <TouchableOpacity>
            <Card.Title>
              <Image
                source={{
                  uri: 'https://picsum.photos/400',
                }}
                style={styles.image}
              />
            </Card.Title>
            <Card.Divider />
            {product.bestSeller && (
              <Card.FeaturedSubtitle>
                <Text style={styles.featured}>BEST SELLER</Text>
              </Card.FeaturedSubtitle>
            )}
            <Text h4 h4Style={styles.productName}>
              {product.name}
            </Text>
            <Text style={styles.pricing}>{product.price}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </>
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
          <View style={styles.row}>{chunk(data, 2).map(renderRow)}</View>
        ) : (
          <Text>Whoops, No data available</Text>
        )}

        {/* <View style={styles.row}>
          <Card containerStyle={styles.card}>
            <TouchableOpacity>
              <Card.Title>
                <Image
                  source={{
                    uri: 'https://picsum.photos/400',
                  }}
                  style={styles.image}
                />
              </Card.Title>
              <Card.Divider />
              <Card.FeaturedSubtitle>
                <Text style={styles.featured}>BEST SELLER</Text>
              </Card.FeaturedSubtitle>
              <Text h4 h4Style={styles.productName}>
                Nike Jordan
              </Text>
              <Text style={styles.pricing}>$459.00</Text>
            </TouchableOpacity>
          </Card>

          <Card
            containerStyle={{
              borderRadius: 16,
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'rgba(0,0,0, 0.0)',
              shadowOffset: {height: 0, width: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
            }}>
            <TouchableOpacity>
              <Card.Title>
                <Image
                  source={{
                    uri: 'https://picsum.photos/400',
                  }}
                  style={{
                    width: 120,
                    height: 120,
                  }}
                />
              </Card.Title>
              <Card.Divider />
              <Text>Demo</Text>
            </TouchableOpacity>
          </Card>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
