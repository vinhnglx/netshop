import {Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

const FavouriteScreeen = () => {
  return (
    <View style={styles.container}>
      <Text>FavouriteScreen</Text>
    </View>
  );
};

export default FavouriteScreeen;
