import { Request, Response, NextFunction } from 'express';
import uuid from 'uuid/v4';

import HttpError from '../models/http-error';

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers'
  }
];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({ users: DUMMY_USERS });
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createUser);
  res.status(201).json({ user: createUser });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({ message: 'Logged in!' });
};
