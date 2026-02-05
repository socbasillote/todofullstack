import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolder,
} from "../controllers/folderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getFolders);
router.put("/:id", updateFolder);
router.delete("/:id", authMiddleware, deleteFolder);

export default router;
