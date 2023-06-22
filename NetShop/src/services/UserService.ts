import {Platform} from 'react-native';
import {BASE_API_URL, BASE_API_URL_ANDROID} from '../util/common';
import axios from 'axios';
import {User} from '../models/User';

const USERS_API_URL =
  Platform.OS === 'ios'
    ? `${BASE_API_URL}/users`
    : `${BASE_API_URL_ANDROID}/users`;

const fetchUser = async (userId?: number) => {
  const response = await axios.get(`${USERS_API_URL}/${userId}`);

  return response.data as User;
};

export const UserService = {fetchUser};
