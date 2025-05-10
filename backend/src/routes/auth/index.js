import { Router } from "express";
import signupRouter from "./signup.js";
import loginRouter from "./login.js";

const authRouter = Router();
authRouter.use("/signup", signupRouter);
authRouter.use("/login", loginRouter);

export default authRouter;
