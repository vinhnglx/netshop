import {useNavigation} from '@react-navigation/native';
import {Button, Input, Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BackIcon} from '../components/BackIcon';
import {GoogleIcon} from '../components/GoogleIcon';
import {useSafeAreaPadding} from '../hooks/useSafeAreaPadding';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backIconStyle: {
    marginLeft: 10,
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    color: '#707B81',
  },
  spacing: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 20,
  },
  whiteBackround: {
    backgroundColor: 'white',
  },
  googleCtaButtonTitle: {
    color: 'black',
    marginHorizontal: 10,
  },
  ctaButtonRounded: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

const SignInScreen = () => {
  const insets = useSafeAreaPadding();
  const navigation = useNavigation();

  return (
    <View style={[insets, styles.container]}>
      <BackIcon
        style={styles.backIconStyle}
        onPress={() => navigation.goBack()}
      />

      <View style={[styles.flex1, styles.center]}>
        <Text h2 h2Style={styles.heading}>
          Hello Again!
        </Text>
        <Text h4 h4Style={styles.subHeading}>
          Welcome Back You’ve Been Missed!
        </Text>
      </View>

      <View style={styles.flex1}>
        <Input label="UserName" placeholder="johndoe" />
        <Input
          label="Password"
          placeholder="**********"
          secureTextEntry={true}
        />
      </View>

      <View style={[styles.flex1, styles.spacing]}>
        <Button buttonStyle={styles.ctaButtonRounded}>Sign In</Button>
        <Button
          buttonStyle={[styles.whiteBackround, styles.ctaButtonRounded]}
          titleStyle={styles.googleCtaButtonTitle}>
          <GoogleIcon />
          Sign in with Google
        </Button>
      </View>

      <View style={[styles.flex1, styles.center]}>
        <Text>Don't have an account?</Text>
        <Button size="sm" type="clear">
          Sign Up for free
        </Button>
      </View>
    </View>
  );
};

export default SignInScreen;
