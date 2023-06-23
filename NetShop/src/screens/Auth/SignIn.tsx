import {useNavigation} from '@react-navigation/native';
import {Button, Input, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BackIcon} from '../../components/BackIcon';
import {useSafeAreaPadding} from '../../hooks/useSafeAreaPadding';
import {AuthStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {signInSchema} from '../../models/User.validation';
import {useAuth} from '../../hooks/useAuth';

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
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

const SignInScreen = () => {
  const insets = useSafeAreaPadding();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'SignUp'>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<{username: string; password: string}>({
    resolver: yupResolver(signInSchema),
  });

  const [isError, setIsError] = useState(false);

  const auth = useAuth();

  const onSubmit = async (data: {username: string; password: string}) => {
    try {
      await auth.signIn(data.username, data.password);
    } catch (error) {
      setIsError(true);
    }
  };

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

      <View style={[styles.flex2, styles.center]}>
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

      <View style={[styles.flex1, styles.spacing]}>
        {isError && (
          <Text style={styles.error}>
            Something went wrong! Please check your username and password
          </Text>
        )}
        <Button
          buttonStyle={styles.ctaButtonRounded}
          onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </View>

      <View style={[styles.flex1, styles.center]}>
        <Text>Don't have an account?</Text>
        <Button
          size="sm"
          type="clear"
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up for free
        </Button>
      </View>
    </View>
  );
};

export default SignInScreen;
