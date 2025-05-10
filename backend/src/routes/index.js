import { Router } from "express";
import authRouter from "./auth/index.js";
import userRouter from "./user.js";
import storiesRouter from "./stories.js";
import authenticate from "#src/middlewares/authenticate.js";

const apiRoutes = Router();
apiRoutes.use("/auth", authRouter);
apiRoutes.use("/user", authenticate, userRouter);
apiRoutes.use("/stories", authenticate, storiesRouter);

apiRoutes.get("/", (req, res) => res.json("Welcome to yomimasho api."));

export default apiRoutes;
