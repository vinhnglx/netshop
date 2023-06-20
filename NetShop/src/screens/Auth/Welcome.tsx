import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Button, Text} from '@rneui/themed';
import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../../App';
import {useSafeAreaPadding} from '../../hooks/useSafeAreaPadding';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  imageBackground: {
    flex: 1,
  },
  imageView: {
    flex: 2,
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
    marginTop: 100,
  },
  contentView: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  h1Style: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ctaButtonView: {
    alignItems: 'flex-end',
  },
  ctaButton: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5B9EE1',
  },
});

const WelcomeScreen = () => {
  const insets = useSafeAreaPadding();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'SignIn'>>();

  return (
    <View style={[insets, styles.container]}>
      <ImageBackground
        source={require('../../static/welcome_bg.png')}
        style={styles.container}
        resizeMode="contain">
        <View style={styles.imageView}>
          <Image
            source={require('../../static/shoe.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.contentView}>
          <Text h1 h1Style={styles.h1Style}>
            Start Journey With Nike
          </Text>
          <Text h4>Smart, Gorgeous & Fashionable Collection</Text>
          <View style={styles.ctaButtonView}>
            <Button
              size="md"
              buttonStyle={styles.ctaButton}
              onPress={() => navigation.navigate('SignIn')}>
              Get Started
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
