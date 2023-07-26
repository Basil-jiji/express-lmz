import { v4 as uuidv4 } from 'uuid';
import HttpError from '../middleware/httpError.js';
import places from '../data/places.js';
import { validationResult } from 'express-validator';

const getPlaces = (req, res, next) => {
  res.json(places);
};

const getPlaceById = (req, res, next) => {
  const place = places.find((p) => p.id === req.params.pid);

  if (!place) {
    throw new HttpError('Could not find a place for the provided id', 404);
  }

  return res.json(place);
};

const getPlaceByUserId = (req, res, next) => {
  const place = places.find((p) => p.creator === req.params.uid);

  if (!place) {
    throw new HttpError('Could not find a place for the provided user id');
  }

  return res.json(place);
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  places.push(createPlace);
  res.status(201).json(places);
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }
  const { title, description } = req.body;
  const updatedPlace = { ...places.find((p) => p.id === req.params.pid) };
  const placeIndex = places.findIndex((p) => p.id === req.params.pid);
  updatedPlace.title = title;
  updatedPlace.description = description;

  places[placeIndex] = updatedPlace;
  res.status(200).json(places);
};

const deletePlace = (req, res, next) => {
  if (!places.find((p) => p.id === req.params.pid)) {
    throw new HttpError('Could not find a place for that id', 404);
  }
  places = places.filter((p) => p.id !== req.params.pid);
  console.log(places);
  res.status(200).json({ message: 'Deleted place' });
};

export {
  getPlaces,
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
