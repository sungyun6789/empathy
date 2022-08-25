import axios from 'axios';

import type { User } from '@prisma/client';

export interface AuthParams {
  username: string;
  password: string;
}

export const register = async (params: AuthParams) => await axios.post<unknown, User>('/auth/register', params);

export const login = async (params: AuthParams) => await axios.post<unknown, User>('/auth/login', params);

export const logout = async (user: User) => await axios.post('/auth/logout', user);

export const getMyAccount = async () => {
  const { data } = await axios.get<User>('/auth/me');
  return data;
};
