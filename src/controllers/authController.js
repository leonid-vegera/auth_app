import {User} from "../models/User.js";

async function register (req, res, next) {
 const { email, password } = req.body;

 const newUser = await User.create({ email, password });
 res.send(newUser)
}

export const authController = {register};
