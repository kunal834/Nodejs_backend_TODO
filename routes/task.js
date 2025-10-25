import express, { Router } from "express";
import { deletetask, newTask, updatetask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getmytask } from "../controllers/task.js";
const router = express.Router();

router.post("/new" , isAuthenticated,  newTask)
router.get("/alltasks" , isAuthenticated,  getmytask)

// always dynamic route at backend 
router.route("/:id").put(isAuthenticated, updatetask).delete(isAuthenticated, deletetask)

export default router;

