import express from "express";

import {
  login
} from "#src/controllers/auth/userController.js";

const router = express.Router();

router.post("/", login);

export default router;
