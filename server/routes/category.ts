import { getAllCategories } from "../controllers/category";
import { Router } from "express";

const router = Router();

router.get("/", getAllCategories);

export default router;
