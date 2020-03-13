import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error';

const JWT_KEY: any = process.env.JWT_KEY;

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
      if (!token) {
        throw new Error('Authentication failed!');
      }
      const decodedToken: any = jwt.verify(token, JWT_KEY);
      req.userData = { userId: decodedToken.userId };
      return next();
    }
    throw new Error('Authentication failed!');
  } catch (err) {
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};

export default checkAuth;
