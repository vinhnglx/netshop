import axios from 'axios';

import BcryptReactNative from 'bcrypt-react-native';
import {User, UserRole} from '../models/User';

const BASE_API_URL = 'http://localhost:3000';
const USERS_API_URL = `${BASE_API_URL}/users`;
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export interface AuthResponse {
  error?: string;
  token?: string;
  role?: UserRole;
}

const MOCK_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZpbmggTmd1eWVuIiwiaWF0IjoxNTE2MjM5MDIyfQ.AZjKtda-eGfyfvC6KBYgOcqQ2IJs7JN21UI7oxZ_E40';

const signUp = async (user: User) => {
  try {
    const response = await axiosInstance.get('http://localhost:3000/users');
    const users: User[] = response.data;

    const existingUser = users.find(u => u.username === user.username);

    if (existingUser) {
      throw Error('User existed');
    }

    const salt = await BcryptReactNative.getSalt(10);
    const hash = await BcryptReactNative.hash(salt, user.password);

    user.password = hash;
    await axiosInstance.post(USERS_API_URL, user);

    return {
      token: MOCK_JWT,
      role: UserRole.CUSTOMER,
    } as AuthResponse;
  } catch (error: any) {
    return {error: 'Something went wrong'} as AuthResponse;
  }
};

const signIn = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.get(USERS_API_URL);
    const users: User[] = response.data;

    const user = users.find(u => u.username === username);

    if (!user) {
      throw Error('User not existed');
    }

    const isSamePassword = await BcryptReactNative.compareSync(
      password,
      user.password,
    );

    if (!isSamePassword) {
      throw Error('Invalid password');
    }

    return {
      token: MOCK_JWT,
      role: user.role,
    } as AuthResponse;
  } catch (error: any) {
    return {error: 'Something went wrong'} as AuthResponse;
  }
};

export const AuthenticationService = {signUp, signIn};
