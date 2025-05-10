import { Router } from "express";

import { getInfo } from "../controllers/auth/userController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/profile", authenticate, getInfo);

export default router;
