import axios from 'axios';

import type { Item } from '@prisma/client';

type CreateItemParams = Pick<Item, 'description' | 'url'>;

type GetItems = Pick<Item, 'id' | 'description' | 'videoId'>;

export const createItem = async (params: CreateItemParams) => await axios.post('/items', params);

export const getItems = async () => {
  const { data } = await axios.get<GetItems[]>('/items');
  return data;
};

export const getItemDetails = async (id: string) => {
  const { data } = await axios.get<Item>(`/items/${id}`);
  return data;
};
