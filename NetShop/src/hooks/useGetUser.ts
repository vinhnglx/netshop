import {useQuery} from '@tanstack/react-query';
import {User} from '../models/User';
import {UserService} from '../services/UserService';

export const useGetUser = (id?: number) => {
  const {isLoading, data} = useQuery<User>(['user'], () =>
    UserService.fetchUser(id),
  );
  return {isLoading, data};
};
