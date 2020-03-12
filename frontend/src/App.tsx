import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState('');

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

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
