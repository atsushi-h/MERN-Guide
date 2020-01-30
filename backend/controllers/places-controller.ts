import { Request, Response, NextFunction } from 'express';
import uuid from 'uuid/v4';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';

let DUMMY_PLACES = [
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

export const getPlacesByUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter(p => p.creator === userId);

  // Error
  if (!places || places.length === 0) {
    const error = new HttpError('Could not find places for the provided user id.', 404);
    return next(error);
  }

  // Success
  res.json({ places });
};

export const createPlace = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

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

export const updatePlace = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = DUMMY_PLACES.find(p => p.id === placeId);
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  // updatedPlaceがundefinedでないとき
  if (updatedPlace) {
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex] = updatedPlace;
  }
  
  res.status(200).json({ place: updatedPlace });
};

export const deletePlace = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id.', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

  res.status(200).json({ message: 'Deleted place.' });
};
