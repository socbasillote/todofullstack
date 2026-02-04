import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  getUserTodos,
  toggleTodoComplete,
  updateTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getFolderTodos } from "../controllers/folderController.js";

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getUserTodos);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle", authMiddleware, toggleTodoComplete);

router.get("/", getFolderTodos);

export default router;
