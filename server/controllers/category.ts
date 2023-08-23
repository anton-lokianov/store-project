import { Request, Response } from "express";
import { CategoryModel } from "../models/Store";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
