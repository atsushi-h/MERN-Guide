import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import monggose from 'mongoose';

import placesRoutes from './routes/places-routes';
import usersRoutes from './routes/users-routes';
import HttpError from './models/http-error';

const app = express();

app.use(bodyParser.json());

// CORS対策
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes); // => /api/places/...
app.use('/api/users', usersRoutes);

// Routing Error
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

interface Error {
  code: number,
  message: string,
}
// Error Handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});

if (process.env.DB_URL) {
  monggose.connect(process.env.DB_URL).then(() => {
    app.listen(5000);
    console.log('Server Start! http://localhost:5000');
  }).catch(error => {
    console.log(error);
  });
}
