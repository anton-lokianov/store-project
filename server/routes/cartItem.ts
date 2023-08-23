import express from "express";
import {
  addItemToCart,
  deleteAllCartItems,
  deleteCartItem,
  getCartItem,
  updateCartItem,
} from "../controllers/cartItem";

const router = express.Router();

router.post("/:cartId", addItemToCart);
router.get("/:cartId", getCartItem);
router.put("/:cartId/:itemId", updateCartItem);
router.delete("/allCartItems/:cartId", deleteAllCartItems);
router.delete("/:cartId/:productId", deleteCartItem);

export default router;
