import axios from 'axios';

import type { User } from '@prisma/client';

export interface AuthParams {
  username: string;
  password: string;
}

export const register = async (params: AuthParams) => await axios.post<unknown, User>('/api/auth/register', params);

export const login = async (params: AuthParams) => await axios.post<unknown, User>('/api/auth/login', params);

export const logout = async (user: User) => await axios.post('/api/auth/logout', user);

export const getMyAccount = async () => {
  const { data } = await axios.get<User>('/api/auth/me');
  return data;
};
