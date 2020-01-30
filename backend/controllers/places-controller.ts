import { Request, Response, NextFunction } from 'express';
import uuid from 'uuid/v4';

import HttpError from '../models/http-error';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

export const getPlaceById = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => p.id === placeId);

  // Error
  if (!place) {
    const error = new HttpError('Could not find a place for the provided id.', 404);
    throw error;
  }

  // Success
  res.json({ place }); // => { place } => { place: place }
};

export const getPlaceByUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find(p => p.creator === userId);

  // Error
  if (!place) {
    const error = new HttpError('Could not find a place for the provided user id.', 404);
    return next(error);
  }

  // Success
  res.json({ place });
};

export const createPlace = (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    coordinates,
    address,
    creator
  } = req.body;
  const createdPlace = {
    id: uuid(), // Unique ID
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};