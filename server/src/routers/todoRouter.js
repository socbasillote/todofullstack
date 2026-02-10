import express from "express";
import {
  assignTodoToFolder,
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  getUserTodos,
  reorderTodos,
  toggleTodoComplete,
  updateTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTodo);

router.get("/", authMiddleware, getTodos);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle", authMiddleware, toggleTodoComplete);
router.patch("/:id/assign-folder", authMiddleware, assignTodoToFolder);
router.patch("/reorder", authMiddleware, reorderTodos);

export default router;
