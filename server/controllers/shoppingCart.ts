import { Request, Response } from "express";
import { ShoppingCartModel, UserModel } from "../models/Store";

export const getShoppingCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Fetch the latest shopping cart for the user
    const user = await UserModel.findById(id);

    if (user?.role !== "customer") return;

    const lastShoppingCart = await ShoppingCartModel.findOne({ customerId: id })
      .sort({ createdAt: -1 })
      .limit(1);

    // If there's no shopping cart (i.e., for a new user), create a new one
    if (!lastShoppingCart) {
      const newShoppingCart = new ShoppingCartModel({ customerId: id });
      await newShoppingCart.save();
      return res.status(201).json(newShoppingCart);
    }

    // If a valid shopping cart is found, return it
    return res.status(200).json(lastShoppingCart);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
