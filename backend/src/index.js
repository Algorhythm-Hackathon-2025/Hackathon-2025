import e, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./error/handler.js";
import { URLnotFound } from "./error/errors.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = 3012;
const app = e();

app.use(json());
app.use(cookieParser());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.all("/{*any}", (req, _, next) => {
  next(URLnotFound(req.url));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI not found");
mongoose
  .connect(MONGO_URI)
  .then((mongo) => console.log("MongoDB connected:", mongo.connection.name));
