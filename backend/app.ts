import express from 'express';
import bodyParser from 'body-parser';

import placesRoutes from './routes/places-routes';

const app = express();

app.use('/api/places', placesRoutes); // => /api/places/...

app.listen(5000);
