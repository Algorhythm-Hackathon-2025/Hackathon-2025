import express from "express";

import { getInfo } from "../controllers/auth/userController.js";

const router = express.Router();

router.get("/profile", getInfo);

export default router;
