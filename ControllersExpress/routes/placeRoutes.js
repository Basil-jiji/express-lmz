import express from 'express';
const router = express.Router();
import {
  getPlaceById,
  getPlaceByUserId,
  getPlaces,
} from '../controllers/placeController.js';

router.route('/').get(getPlaces);
router.route('/:pid').get(getPlaceById);
router.route('/user/:uid').get(getPlaceByUserId);

export default router;
