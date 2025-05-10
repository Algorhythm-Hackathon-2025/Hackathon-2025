import mongoose from "mongoose";
import dotenv from "dotenv";
import Users from "./model/users.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI not found");
const db = await mongoose.connect(MONGO_URI);

console.log("MongoDB connected ", db.connection.name);

const ADMIN_USER = {
  email: "admin@email.com",
  firstName: "Admin",
  lastName: "Bob",
  age: 20,
  password: "AdminPassw0rd123",
};

const user = new Users(ADMIN_USER);
await user.save();
console.log("Added admin");
