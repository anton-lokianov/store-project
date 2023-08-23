import { Request, Response } from "express";
import { OrderModel, ShoppingCartModel } from "../models/Store";

export const makeOrder = async (req: Request, res: Response) => {
  const orderDetails = req.body;
  try {
    const newOrder = new OrderModel(orderDetails);
    const savedOrder = await newOrder.save();
    const newShoppingCart = new ShoppingCartModel({
      customerId: newOrder.customerId,
    });
    await newShoppingCart.save();

    res.status(201).json({ savedOrder, newShoppingCart });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getOverBookedDates = async (req: Request, res: Response) => {
  try {
    const overBookedDates = await OrderModel.aggregate([
      {
        $group: {
          _id: "$deliveryDate", // Group by deliveryDate
          count: { $sum: 1 }, // Sum each occurrence of the date
        },
      },
      {
        $match: {
          count: { $gte: 3 }, // Filter the dates where count is greater than 3
        },
      },
    ]);
    const dates = overBookedDates.map((date) => date._id);
    res.status(200).json(dates);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrdersAmount = async (req: Request, res: Response) => {
  try {
    const ordersAmount = await OrderModel.countDocuments();
    res.status(200).json(ordersAmount);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
