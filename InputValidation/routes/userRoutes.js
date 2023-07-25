import express from 'express';
import { check } from 'express-validator';
import { getUsers, signup, login } from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers);

router
  .route('/signup').post(signup)
  [
    (check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }))
  ]

router.route('/login').post(login);

export default router;
