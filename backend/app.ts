import express from 'express';
import bodyParser from 'body-parser';

import placesRoutes from './routes/places-routes';

const app = express();

app.use('/api/places', placesRoutes); // => /api/places/...

// Error Handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);
