import React from 'react';
import {useSafeAreaPadding} from '../../hooks/useSafeAreaPadding';
import {View} from 'react-native';
import {Text} from '@rneui/themed';

const HomeScreen = () => {
  const insets = useSafeAreaPadding();

  return (
    <View style={[insets]}>
      <Text>Hello</Text>
    </View>
  );
};

export default HomeScreen;
