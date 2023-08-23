import { Request, Response } from "express";
import { CartItemModel, ShoppingCartModel } from "../models/Store";

export const addItemToCart = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const item = req.body;

  try {
    const shoppingCart = await ShoppingCartModel.findOne({ _id: cartId });
    if (!shoppingCart)
      return res.status(404).json({ message: "Shopping cart not found" });

    const existingCartItem = await CartItemModel.findOne({
      cartId: cartId,
      productId: item.productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += item.quantity;
      existingCartItem.generalPrice += item.generalPrice;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    } else {
      const cartItem = new CartItemModel({ ...item, cartId: cartId });
      const newItem = await cartItem.save();
      return res.status(201).json(newItem);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartItem = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  try {
    const cartItems = await CartItemModel.find({ cartId: cartId });
    if (!cartItems) return res.status(404).json({ message: "No items found" });
    res.status(200).json(cartItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { cartId, itemId } = req.params;
  const item = req.body;

  try {
    const cartItem = await CartItemModel.findOne({
      cartId: cartId,
      productId: itemId,
    });

    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found." });

    cartItem.quantity = item.quantity;
    cartItem.generalPrice = item.generalPrice;

    if (cartItem.quantity === 0) {
      await CartItemModel.deleteOne({ _id: cartItem._id });
    }

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { cartId, productId } = req.params;
  try {
    const cartItem = await CartItemModel.findOne({
      cartId: cartId,
      productId: productId,
    });
    if (!cartItem) return res.status(404).json({ message: "Item not found." });
    await CartItemModel.deleteOne({ _id: cartItem._id });
    res.status(200).json({ message: "Item deleted successfully.", cartItem });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllCartItems = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  try {
    const deleteResult = await CartItemModel.deleteMany({ cartId: cartId });

    if (deleteResult.deletedCount === 0) {
      res.status(404).json({ message: "No items found for provided cart ID." });
      return;
    }

    res.status(200).json({ message: "Items deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting cart items:", error.message); // Enhanced error logging
    res.status(500).json({ message: error.message });
  }
};
