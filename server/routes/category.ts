import { getAllCategories } from "../controllers/category";
import { Router } from "express";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("/", getAllCategories);

export default router;
