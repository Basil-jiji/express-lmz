import express from 'express';
const router = express.Router();
import places from '../data/places.js';
import HttpError from '../middleware/httpError.js';

router.get('/', (req, res) => {
  res.json(places);
});

router.get('/:pid', (req, res) => {
  const place = places.find((p) => p.id === req.params.pid);

  if (!place) {
    // const error = new Error('Could not find a place for the provided id');
    // error.code = 404;
    // throw error;
    throw new HttpError('Could not find a place for the provided id', 404);
  }

  return res.json(place);
});

router.get('/user/:uid', (req, res) => {
  const place = places.find((p) => p.creator === req.params.uid);

  if (!place) {
    // const error = new Error('Could not find a place for the provided user id');
    // error.code = 404;
    // throw error;
    throw new HttpError('Could not find a place for the provided user id');
  }

  return res.json(place);
});

export default router;
