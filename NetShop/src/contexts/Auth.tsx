import React, {createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {has} from 'lodash';
import {User} from '../models/User';
import {
  AuthResponse,
  AuthenticationService,
} from '../services/AuthenticationService';

export type AuthContextData = {
  loading: boolean;
  authResponse?: AuthResponse;
  signUp(user: User): Promise<void>;
  signIn(username: string, password: string): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({children}) => {
  const [authResponse, setAuthResponse] = useState<AuthResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authResponseSerialized = await AsyncStorage.getItem(
        '@AuthResponse',
      );
      if (authResponseSerialized) {
        const _authData: AuthResponse = JSON.parse(authResponseSerialized);
        setAuthResponse(_authData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async (user: User) => {
    const response = await AuthenticationService.signUp(user);

    setAuthResponse(response);

    await AsyncStorage.setItem('@AuthResponse', JSON.stringify(response));
  };

  const signIn = async (username: string, password: string) => {
    const response = await AuthenticationService.signIn(username, password);

    if (has(authResponse, 'error')) {
      throw Error("Can't login");
    }

    setAuthResponse(response);

    await AsyncStorage.setItem('@AuthResponse', JSON.stringify(response));
  };

  const signOut = async () => {
    setAuthResponse(undefined);

    await AsyncStorage.removeItem('@AuthResponse');
  };

  return (
    <AuthContext.Provider
      value={{authResponse, loading, signUp, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
