import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  userId: '',
  login: (uid: string, token: string, expirationDate?: Date) => {},
  logout: () => {},
});
