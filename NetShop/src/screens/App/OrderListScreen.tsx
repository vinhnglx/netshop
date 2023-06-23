import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListItem} from '@rneui/themed';
import {format} from 'date-fns';
import React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import {AppAdminStackParamList} from '../../../App';
import {useGetOrders} from '../../hooks/useGetOrders';

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

const OrderListScreen = () => {
  const {data: orders} = useGetOrders();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppAdminStackParamList, 'OrderDetail'>
    >();

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={[styles.container]}>
      {orders?.map((order, index) => (
        <ListItem
          key={index}
          onPress={() => navigation.navigate('OrderDetail', {id: order.id})}
          Component={TouchableHighlight}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              OrderId: {order.id}
            </ListItem.Title>
            <ListItem.Subtitle>
              Date: {format(new Date(order.createdAt), 'MM/dd/yyyy')}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default OrderListScreen;
