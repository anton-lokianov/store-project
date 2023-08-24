import express from "express";
import {
  addItemToCart,
  deleteAllCartItems,
  deleteCartItem,
  getCartItem,
  updateCartItem,
} from "../controllers/cartItem";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/:cartId", verifyToken, addItemToCart);
router.get("/:cartId", verifyToken, getCartItem);
router.put("/:cartId/:itemId", verifyToken, updateCartItem);
router.delete("/allCartItems/:cartId", verifyToken, deleteAllCartItems);
router.delete("/:cartId/:productId", verifyToken, deleteCartItem);

export default router;
