import axios from 'axios';

import type { Item } from '@prisma/client';

type CreateItemParams = Pick<Item, 'description' | 'url'>;

type GetItems = Pick<Item, 'id' | 'description' | 'videoId'> & { itemLikes: number };

interface ItemDetail extends Item {
  likes: number;
}

export const createItem = async (params: CreateItemParams) => await axios.post('/items', params);

export const getItems = async () => {
  const { data } = await axios.get<GetItems[]>('/items');
  return data;
};

export const getItemDetails = async (id: string) => {
  const { data } = await axios.get<ItemDetail>(`/items/${id}`);
  return data;
};

export const likeItem = async (id: string) => await axios.post(`/items/${id}/like`);
