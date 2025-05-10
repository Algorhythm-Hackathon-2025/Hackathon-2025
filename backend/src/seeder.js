import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./model/users.js"; 

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    username: "worker1",
    email: "worker1@example.com",
    password: "worker123",
    role: "worker",
  },
  {
    username: "user1",
    email: "user1@example.com",
    password: "user123",
    role: "user",
  },
];

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    console.log("Old users removed");

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    console.log("Sample users inserted");

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedUsers();
