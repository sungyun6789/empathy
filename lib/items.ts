import axios from 'axios';

import type { Item } from '@prisma/client';

type CreateItemParams = Pick<Item, 'description' | 'url'>;

export const createItem = async (params: CreateItemParams) => await axios.post('/items', params);

export const getItems = async () => {
  const { data } = await axios.get<Item[]>('/items');
  return data;
};
