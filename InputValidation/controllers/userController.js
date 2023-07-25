import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import HttpError from '../middleware/httpError.js';
import users from '../data/users.js';

const getUsers = (req, res, next) => {
  res.json(users);
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, email, password } = req.body;

  const hasUser = users.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = users.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong.',
      401
    );
  }
  res.json({ message: 'Logged in!' });
};

export { getUsers, signup, login };
