import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/Welcome';
import SignInScreen from './src/screens/SignIn';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
