import BcryptReactNative from 'bcrypt-react-native';
import {User, UserRole} from '../models/User';
import {
  BASE_API_URL,
  BASE_API_URL_ANDROID,
  axiosInstance,
} from '../util/common';
import {Platform} from 'react-native';

const USERS_API_URL =
  Platform.OS === 'ios'
    ? `${BASE_API_URL}/users`
    : `${BASE_API_URL_ANDROID}/users`;

export interface AuthResponse {
  error?: string;
  token?: string;
  role?: UserRole;
  userId: number;
}

const MOCK_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZpbmggTmd1eWVuIiwiaWF0IjoxNTE2MjM5MDIyfQ.AZjKtda-eGfyfvC6KBYgOcqQ2IJs7JN21UI7oxZ_E40';

const signUp = async (user: User) => {
  try {
    const response = await axiosInstance.get(USERS_API_URL);
    const users: User[] = response.data;

    const existingUser = users.find(u => u.username === user.username);

    if (existingUser) {
      throw Error('User existed');
    }

    const salt = await BcryptReactNative.getSalt(10);
    const hash = await BcryptReactNative.hash(salt, user.password);

    user.password = hash;
    const userResponse = await axiosInstance.post(USERS_API_URL, user);

    return {
      token: MOCK_JWT,
      role: UserRole.CUSTOMER,
      userId: userResponse.data.id,
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
      userId: user.id,
    } as AuthResponse;
  } catch (error: any) {
    return {error: 'Something went wrong'} as AuthResponse;
  }
};

export const AuthenticationService = {signUp, signIn};
