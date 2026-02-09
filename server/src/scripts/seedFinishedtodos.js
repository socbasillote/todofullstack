import mongoose from "mongoose";
import Todo from "../models/Todo.js";

const MONGO_URI = "mongodb://localhost:27017/fullstacking"; // update this
const USER_ID = "698266987ef30c0b2ee4c2f9"; // required

const run = async () => {
  await mongoose.connect(MONGO_URI);

  const now = new Date();

  const dummyTodos = [
    {
      title: "Pay electricity bill",
      description: "Meralco payment",
      completed: true,
      completedAt: new Date(now.getFullYear(), now.getMonth() - 1, 3, 10, 15),
      createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 3, 9, 0),
    },
    {
      title: "Finish React refactor",
      description: "Cleanup TodoList component",
      completed: true,
      completedAt: new Date(now.getFullYear(), now.getMonth() - 1, 7, 18, 40),
      createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 7, 14, 0),
    },
    {
      title: "Renew domain",
      description: "Portfolio website",
      completed: true,
      completedAt: new Date(now.getFullYear(), now.getMonth() - 1, 15, 8, 30),
      createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 14, 20, 0),
    },
  ].map((t) => ({
    ...t,
    user: USER_ID,
    folder: null,
    expiresAt: null,
  }));

  await Todo.insertMany(dummyTodos);

  console.log("✅ Dummy finished todos inserted");
  process.exit();
};

run();
