import { User } from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/emailService.js';
import { userService } from '../services/userService.js';
import { jwtService } from '../services/jwtService.js';

async function register(req, res, next) {
  const { email, password } = req.body;

  const activationToken = uuidv4();
  const newUser = await User.create({ email, password, activationToken });

  await emailService.sendActivationLink(email, activationToken);

  res.send(newUser);
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

  if (password !== user.password) {
    res.sendStatus(401);
    return;
  }

  const userData = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);

  res.send({
    user: userData,
    accessToken,
  });
}

export const authController = { register, activate, login };
