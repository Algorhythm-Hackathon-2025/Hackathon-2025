import e, { json } from "express";
import dotenv from "dotenv";
import errorHandler from "./error/handler.js";
import { URLnotFound } from "./error/errors.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";

const PORT = 3012;
const app = e();

dotenv.config();
connectDB();

app.use(cors({origins: "localhost:5173"}));

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
