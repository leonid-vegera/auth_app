import express from 'express';
import { authController } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.get('/', (req, res) => {
  res.send('It is OK');
});

authRouter.post('/registration', authController.register);
authRouter.get('/activation/:activationToken', authController.activate);
authRouter.post('/login', authController.login);
