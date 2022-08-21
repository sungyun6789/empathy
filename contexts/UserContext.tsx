import { createContext, useMemo, useState } from 'react';
import React from 'react';

import type { User } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

interface UserContextType {
  state: User | undefined;
  setState: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType>({
  state: undefined,
  setState: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [state, setState] = useState<User>();

  const value = useMemo(() => ({ state, setState }), [state, setState]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
