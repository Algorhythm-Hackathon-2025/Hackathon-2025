import { Router } from "express";
import signupRouter from "./signup.js";
import loginRouter from "./login.js";
import { logout } from "#src/controllers/auth/userController.js";
const authRouter = Router();
authRouter.use("/signup", signupRouter);
authRouter.use("/login", loginRouter);
authRouter.post("/logout", logout)

export default authRouter;
