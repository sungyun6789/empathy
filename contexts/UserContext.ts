import { createContext } from 'react';

import type { User } from '@prisma/client';

export const UserContext = createContext<User | undefined>(undefined);
