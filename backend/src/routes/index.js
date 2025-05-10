import { Router } from "express";
import authRouter from "./auth/index.js";
import userRouter from "./user.js";
import authenticate from "#src/middlewares/authenticate.js";

import problemRoutes from "./problemRoutes.js";

const apiRoutes = Router();
apiRoutes.use("/auth", authRouter);
apiRoutes.use("/user", userRouter);
apiRoutes.use("/problems", authenticate, problemRoutes);

apiRoutes.get("/", (req, res) => res.json("Welcome to yomimasho api."));

export default apiRoutes;
