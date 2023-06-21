import React, {createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {
  AuthResponse,
  AuthenticationService,
} from '../services/AuthenticationService';
import {User} from '../models/User';

export type AuthContextData = {
  loading: boolean;
  authResponse?: AuthResponse;
  signUp(user: User): Promise<void>;
  signIn(username: string, password: string): Promise<void>;
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

    AsyncStorage.setItem('@AuthResponse', JSON.stringify(response));
  };

  const signIn = async (username: string, password: string) => {
    const response = await AuthenticationService.signIn(username, password);

    setAuthResponse(response);

    AsyncStorage.setItem('@AuthResponse', JSON.stringify(response));
  };

  return (
    <AuthContext.Provider value={{authResponse, loading, signUp, signIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};