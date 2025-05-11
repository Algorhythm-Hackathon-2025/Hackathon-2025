import { invalidJwtError, missingJwtError } from "#src/error/errors.js";
import Users from "#src/model/users.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticate = asyncHandler(async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found");
  const { jwt: jwtToken } = req.cookies;
  if (!jwtToken) {
    throw missingJwtError();
  }
  const { id } = jwt.verify(jwtToken, secret);
  if (!id) {
    throw invalidJwtError();
  }
  const user = await Users.findById(id);
  if (!user) {
    throw invalidJwtError();
  }
  req.user = user;
  next();
});
export default authenticate;

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only." });
  }
};
