import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState('');

  // ログイン
  const login = useCallback((uid: string, token: string, expirationDate?: Date) => {
    setToken(token);
    setUserId(uid);

    const lateOneHour = new Date(new Date().getTime() + 1000 * 60 * 60); // 現在時刻より1時間後
    const tokenExpirationDate = expirationDate || lateOneHour; // トークンの有効期限
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  // ログアウト
  const logout = useCallback(() => {
    setToken('');
    setTokenExpirationDate(null);
    setUserId('');
    localStorage.removeItem('userData');
  }, []);

  // 自動ログアウト
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // LocalStorageにトークンがあったら自動ログイン
  useEffect(() => {
    const storedDataText = localStorage.getItem('userData');
    if (storedDataText) {
      const storedDataObject = JSON.parse(storedDataText);
      if (
        storedDataObject &&
        storedDataObject.token &&
        new Date(storedDataObject.expiration) > new Date()
      ) {
        login(
          storedDataObject.userId,
          storedDataObject.token,
          new Date(storedDataObject.expiration)
        );
      }
    }
  }, [login]);

  return { token, login, logout, userId };
};