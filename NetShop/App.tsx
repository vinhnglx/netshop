import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/App/HomeScreen';
import SignInScreen from './src/screens/Auth/SignIn';
import SignUpScreen from './src/screens/Auth/SignUp';
import WelcomeScreen from './src/screens/Auth/Welcome';
import {AuthProvider} from './src/contexts/Auth';
import {useAuth} from './src/hooks/useAuth';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const Router = () => {
  const {loading, authResponse} = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <NavigationContainer>
      {authResponse ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
