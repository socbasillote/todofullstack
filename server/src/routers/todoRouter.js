import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  getUserTodos,
  updateTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getUserTodos);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
