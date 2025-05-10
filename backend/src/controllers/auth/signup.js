import asyncHandler from "#src/middlewares/asyncHandler.js";
import validateAll from "#src/middlewares/validateAll.js";
import Users from "../../model/users.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";

// Validation middleware
export const signupValidation = validateAll([
  body("username").isString().notEmpty(),
  body("number").isString().notEmpty(),
  body("password").isString().isLength({ min: 6 }),
]);

export const signup = asyncHandler(async (req, res) => {
  const { username, number, password } = req.body;

  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Users({
    username,
    number,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});
