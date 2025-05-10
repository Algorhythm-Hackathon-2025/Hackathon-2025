import Users from "#src/model/users.js";
import asyncHandler from "#src/middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";

export const getInfo = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { _id, number, username, isAdmin, createdAt, balance } = req.user;
  res.json({ _id, number, username, isAdmin, createdAt, balance });
});

export const login = asyncHandler(async (req, res) => {
  const { number, password } = req.body;

  try {
    const user = await Users.findOne({ number });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (
      user &&
      typeof user.matchPassword === "function" &&
      (await user.matchPassword(password))
    ) {
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
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
