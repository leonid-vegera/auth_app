import { User } from '../models/User.js';

function getAllActive() {
  return User.findAll({
    where: { activationToken: null }
  });
}

function normalize({ id, email }) {
  return { id, email };
}

function getByEmail(email) {
  return User.findOne({
    where: { email: email }
  });
}

export const userService = { getAllActive, normalize, getByEmail };
