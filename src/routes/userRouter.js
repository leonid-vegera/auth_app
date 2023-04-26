import express from "express";
import {userController} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get('/', userController.getAll)
