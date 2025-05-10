import e, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./error/handler.js";
import { URLnotFound } from "./error/errors.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = 3012;
const app = e();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(json());
app.use(cookieParser());
app.use("/api", apiRoutes);

app.all("/{*any}", (req, _, next) => {
  next(URLnotFound(req.url));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
