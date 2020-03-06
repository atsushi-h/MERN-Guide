import { Request, Response, NextFunction } from 'express';
import uuid from 'uuid/v4';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';
import getCoordsForAddress from '../util/location';
import Place from '../models/place';

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

export const getPlaceById = async (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  // Error
  if (!place) {
    const error = new HttpError(
      'Could not find a place for the provided id.', 
      404
    );
    return next(error);
  }

  // Success
  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

export const getPlacesByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;
  
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later',
      500
    );
    return next(error);
  }

  // Error
  if (!places || places.length === 0) {
    const error = new HttpError(
      'Could not find a place for the provided user id.',
      404
    );
    return next(error);
  }

  // Success
  res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

export const createPlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates: {
    lat: number,
    lng: number
  };
  try {
    coordinates = await getCoordsForAddress();
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    address,
    location: coordinates,
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

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
