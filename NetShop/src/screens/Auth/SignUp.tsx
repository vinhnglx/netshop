import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {Button, Input, Text} from '@rneui/themed';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BackIcon} from '../../components/BackIcon';
import {useSafeAreaPadding} from '../../hooks/useSafeAreaPadding';
import {User, UserRole} from '../../models/User';
import {userSchema} from '../../models/User.validation';
import {useAuth} from '../../hooks/useAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 25,
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
  form: {
    marginTop: 20,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    color: '#707B81',
  },
  spacing: {
    marginTop: 10,
    marginBottom: 20,
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
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Pick<User, Exclude<keyof User, 'role' | 'id'>>>({
    resolver: yupResolver(userSchema),
  });

  const auth = useAuth();

  const onSubmit = async (
    data: Pick<User, Exclude<keyof User, 'role' | 'id'>>,
  ) => {
    const user = {
      ...data,
      role: UserRole.CUSTOMER,
    };

    await auth.signUp(user);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={[styles.container, insets]}
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
            Let's Create Account Together
          </Text>
        </View>

        <View style={[styles.flex2, styles.form]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="First Name"
                placeholder="John"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.firstName ? errors.firstName.message : ''}
              />
            )}
            name="firstName"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Last Name"
                placeholder="Doe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.lastName ? errors.lastName.message : ''}
              />
            )}
            name="lastName"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="User Name"
                placeholder="johndoe"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.username ? errors.username.message : ''}
              />
            )}
            name="username"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Email"
                placeholder="johndoe@example.com"
                inputMode="email"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email ? errors.email.message : ''}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Password"
                placeholder="**********"
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password ? errors.password.message : ''}
              />
            )}
            name="password"
          />
        </View>

        <View
          style={[styles.flex1, styles.spacing, styles.justifyContentCenter]}>
          <Button
            buttonStyle={styles.ctaButtonRounded}
            onPress={handleSubmit(onSubmit)}>
            Sign Up
          </Button>
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
