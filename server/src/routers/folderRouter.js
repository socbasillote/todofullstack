import express from "express";
import {
  createFolder,
  deletFolder,
  getFolders,
  updateFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.post("/", createFolder);
router.get("/", getFolders);
router.put("/:id", updateFolder);
router.delete("/:id", deletFolder);

export default router;
