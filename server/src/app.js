import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routers/authRouter.js";
import todoRouter from "./routers/todoRouter.js";
import folderRouter from "./routers/folderRouter.js";

dotenv.config();
const app = express();

//midleware
app.use(cors());
app.use(express.json());

// Router
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
app.use("/api/folders", folderRouter);

export default app;
