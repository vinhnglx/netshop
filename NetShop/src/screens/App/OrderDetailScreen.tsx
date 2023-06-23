import {useRoute} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {useGetOrder} from '../../hooks/useGetOrder';
import {format} from 'date-fns';

type RouteParams = {
  id: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentContainer: {
    paddingBottom: 25,
  },
  title: {
    marginBottom: 5,
    color: '#5B9EE1',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
  bottom: {
    marginBottom: 5,
  },
  xbottom: {
    marginBottom: 20,
  },
  top: {
    marginTop: 10,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
});

const OrderDetailScreen = () => {
  const route = useRoute();
  const {id} = route.params as RouteParams;

  const {data: order, isLoading} = useGetOrder(id);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={[styles.container]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#5B9EE1" />
      ) : order ? (
        <>
          <View style={styles.xbottom}>
            <Text h4 h4Style={styles.title}>
              Order
            </Text>
            <Text style={[styles.content, styles.bottom]}>ID: {order.id}</Text>
            <Text style={[styles.content, styles.bottom]}>
              Total price: ${order.totalPrice}
            </Text>
            <Text style={styles.content}>
              Delivery Date:{' '}
              {format(new Date(order.deliveryDate), 'MM/dd/yyyy')}
            </Text>
          </View>
          <View style={styles.xbottom}>
            <Text h4 h4Style={styles.title}>
              Receiver Info
            </Text>
            <Text style={[styles.content, styles.bottom]}>
              First Name: {order.receiver.firstName}
            </Text>
            <Text style={[styles.content, styles.bottom]}>
              Last Name: {order.receiver.lastName}
            </Text>
            <Text style={[styles.content, styles.bottom]}>
              Email: {order.receiver.email}
            </Text>
            <Text style={[styles.content, styles.bottom]}>
              Delivery Address: {order.deliveryAddress}
            </Text>
          </View>
          <View>
            <Text h4 h4Style={styles.title}>
              Selected Products
            </Text>
            <View style={[styles.flex1, styles.flexDirectionRow]}>
              <View style={styles.flex2}>
                <Text style={[styles.fontWeightBold, styles.content]}>
                  Name
                </Text>
              </View>
              <View style={styles.flex1}>
                <Text style={[styles.fontWeightBold, styles.content]}>
                  Price
                </Text>
              </View>
              <View style={styles.flex1}>
                <Text style={[styles.fontWeightBold, styles.content]}>
                  Quantity
                </Text>
              </View>
            </View>
            {order.selectedProducts?.map((selectedProd, index) => (
              <View
                key={index}
                style={[styles.flex1, styles.flexDirectionRow, styles.top]}>
                <View style={styles.flex2}>
                  <Text style={styles.content}>
                    {selectedProd.product?.name}
                  </Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.content}>
                    ${selectedProd.product?.price}
                  </Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.content}>{selectedProd.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text>No Order</Text>
      )}
    </ScrollView>
  );
};

export default OrderDetailScreen;
