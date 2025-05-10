import { Router } from "express";
import { signup } from "#src/controllers/auth/signup.js";

const signupRouter = Router();
signupRouter.post("/", signup);

export default signupRouter;
