import express from 'express';
const router = express.Router();
import places from '../data/places.js';

router.get('/', (req, res) => {
  res.json(places);
});

router.get('/:pid', (req, res) => {
  const place = places.find((p) => p.id === req.params.pid);
  return res.json(place);
});

router.get('/user/:uid', (req, res) => {
  const place = places.find((p) => p.creator === req.params.uid);
  return res.json(place);
});

export default router;
