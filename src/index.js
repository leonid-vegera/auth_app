'use strict';

import express from 'express';
import dotenv from 'dotenv';
import {authRouter} from "./routes/authRouter.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json(), authRouter)
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
})
