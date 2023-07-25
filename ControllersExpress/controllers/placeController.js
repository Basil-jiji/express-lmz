import HttpError from '../middleware/httpError.js';
import places from '../../CustomErrorHandling/data/places.js';

const getPlaces = (req, res, next) => {
  res.json(places);
};

const getPlaceById = (req, res, next) => {
  const place = places.find((p) => p.id === req.params.pid);

  if (!place) {
    // const error = new Error('Could not find a place for the provided id');
    // error.code = 404;
    // throw error;
    throw new HttpError('Could not find a place for the provided id', 404);
  }

  return res.json(place);
};

const getPlaceByUserId = (req, res, next) => {
  const place = places.find((p) => p.creator === req.params.uid);

  if (!place) {
    // const error = new Error('Could not find a place for the provided user id');
    // error.code = 404;
    // throw error;
    throw new HttpError('Could not find a place for the provided user id');
  }

  return res.json(place);
};

export { getPlaces, getPlaceById, getPlaceByUserId };
