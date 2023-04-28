import { User } from '../models/User.js';
import { userService } from '../services/userService.js';
import { jwtService } from '../services/jwtService.js';
import { ApiError } from '../exceptions/ApiError.js';
import bcrypt from 'bcrypt';

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

async function register(req, res, next) {
  const { email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password)
  };

  if (errors.email || errors.password) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  await userService.register({ email, password });

  res.send({ message: 'OK' });
}

async function activate(req, res, next) {
  const { activationToken } = req.params;

  const user = await User.findOne({
    where: {
      activationToken: activationToken
    }
  });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = null;
  await user.save();

  res.send(user);
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await userService.getByEmail(email);
  if (!user) {
    throw ApiError.BadRequest('This email does not exist');
  }

  const isPassworValid = await bcrypt.compare(password, user.password);

  if (!isPassworValid) {
    throw ApiError.BadRequest('Password is wrong');
  }

  const userData = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);

  res.send({
    user: userData,
    accessToken,
  });
}

export const authController = { register, activate, login };
