import express from "express";
import { getShoppingCart } from "../controllers/shoppingCart";

const router = express.Router();

router.get("/:id", getShoppingCart);

export default router;
