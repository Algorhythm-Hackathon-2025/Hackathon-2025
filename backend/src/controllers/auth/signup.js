import asyncHandler from "#src/middlewares/asyncHandler.js";
import Users from "../../model/users.js"; // Import your User model
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import { body, validationResult } from "express-validator"; // For input validation

// Validation middleware
export const signupValidation = [
  body("username").isString().notEmpty(),
  body("number").isNumeric().notEmpty(),
  body("password").isString().isLength({ min: 6 }),
];

export const signup = asyncHandler(async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, number, password } = req.body;

  // Check if user already exists
  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new Users({
    username,
    number,
    password: hashedPassword,
    role: "user",
  });

  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});
