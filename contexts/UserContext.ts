import { createContext } from 'react';

interface User {
  username: string;
}

export const UserContext = createContext<User | undefined>(undefined);
