import express from "express";

import {
  login,
  loginValidation,
} from "#src/controllers/auth/userController.js";

const router = express.Router();

router.post("/", loginValidation, login);

export default router;
