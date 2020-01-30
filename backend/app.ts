import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import placesRoutes from './routes/places-routes';
import HttpError from './models/http-error';

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes); // => /api/places/...

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

app.listen(5000);
