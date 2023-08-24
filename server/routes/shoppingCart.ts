import express from "express";
import { getShoppingCart } from "../controllers/shoppingCart";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/:id", getShoppingCart);

export default router;
