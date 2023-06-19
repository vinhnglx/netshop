import {useNavigation} from '@react-navigation/native';
import {Button, Input, Text} from '@rneui/themed';
import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BackIcon} from '../components/BackIcon';
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
  justifyContentCenter: {
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
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
  ctaButtonRounded: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaSignIn: {
    marginBottom: 10,
  },
});

const SignUpScreen = () => {
  const insets = useSafeAreaPadding();
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={[styles.container, insets]}
        keyboardShouldPersistTaps="handled">
        <BackIcon
          style={styles.backIconStyle}
          onPress={() => navigation.goBack()}
        />

        <View style={[styles.flex1, styles.center]}>
          <Text h2 h2Style={styles.heading}>
            Create Account
          </Text>
          <Text h4 h4Style={styles.subHeading}>
            Let’s Create Account Together
          </Text>
        </View>

        <View style={styles.flex2}>
          <Input label="Your Name" placeholder="John Doe" />
          <Input label="UserName" placeholder="johndoe" />
          <Input
            label="Email Address"
            placeholder="johndoe@example.com"
            inputMode="email"
          />
          <Input placeholder="**********" secureTextEntry={true} />
        </View>

        <View
          style={[styles.flex1, styles.spacing, styles.justifyContentCenter]}>
          <Button buttonStyle={styles.ctaButtonRounded}>Sign Up</Button>
        </View>

        <View style={[styles.alignItemsCenter, styles.ctaSignIn]}>
          <Text>Already have an account?</Text>
          <Button size="sm" type="clear" onPress={() => navigation.goBack()}>
            Sign In
          </Button>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
