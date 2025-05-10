import Users from "#src/model/users.js";
import validateAll from "#src/middlewares/validateAll.js";
import asyncHandler from "#src/middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";
import { query } from "express-validator";

export const getInfo = asyncHandler(async (req, res) => {
  const { _id, email, firstName, lastName, age, createdAt, updatedAt } =
    req.user;
  res.json({ _id, email, firstName, lastName, age, createdAt, updatedAt });
});

export const loginValidation = validateAll([
  query("email").isEmail(),
  query("password").isString(),
]);

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.query;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not found");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.json("OK");
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
