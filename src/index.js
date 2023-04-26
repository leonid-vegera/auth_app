'use strict';

import express from 'express';
import dotenv from 'dotenv';
import {authRouter} from './routes/authRouter.js';
import cors from 'cors';
import {userRouter} from './routes/userRouter.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json(), authRouter);
app.use('/users', express.json(), userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
