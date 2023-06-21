import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/contexts/Auth';
import {useAuth} from './src/hooks/useAuth';
import {useBottomBarIcon} from './src/hooks/useBottomBarIcon';
import {useHeaderBarIcon} from './src/hooks/useHeaderBarIcon';
import FavouriteScreen from './src/screens/App/FavouriteScreen';
import HomeScreen from './src/screens/App/HomeScreen';
import NotificationScreen from './src/screens/App/NotificationScreen';
import ProductDetailScreen from './src/screens/App/ProductDetailScreen';
import ProfileScreen from './src/screens/App/ProfileScreen';
import SignInScreen from './src/screens/Auth/SignIn';
import SignUpScreen from './src/screens/Auth/SignUp';
import WelcomeScreen from './src/screens/Auth/Welcome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AppCustomerStackParamList = {
  Home: undefined;
  ProductDetail: {id: number | undefined};
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const CustomerHomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const AppCustomerStack = () => {
  const {
    HomeTabBarIcon,
    NotificationTabBarIcon,
    FavouriteTabBarIcon,
    ProfileTabBarIcon,
  } = useBottomBarIcon();

  const {CartButtonIcon, ClearAllButton} = useHeaderBarIcon();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#5B9EE1',
        title: '',
        headerStyle: {
          backgroundColor: '#F8F9FA',
        },
      }}>
      <Tab.Screen
        name="HomeTag"
        component={CustomerHomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabBarIcon,
          headerRight: CartButtonIcon,
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: FavouriteTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: NotificationTabBarIcon,
          headerRight: ClearAllButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const {loading, authResponse} = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#5B9EE1" />;
  }

  return (
    <NavigationContainer>
      {authResponse ? <AppCustomerStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
