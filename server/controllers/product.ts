import { Request, Response } from "express";
import { CategoryModel, ProductModel } from "../models/Store";
import fs from "fs";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { productName, categoryId } = product;
    const imagePath = req.file?.path;

    const existingProduct = await ProductModel.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const existingCategory = await CategoryModel.findById(categoryId);
    if (!existingCategory) {
      return res.status(400).json({ message: "Category doesn't exist" });
    }

    const newProduct = new ProductModel({ ...product, imagePath });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    if (products.length === 0)
      return res.status(404).json({ message: "No products" });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const product = await ProductModel.findById(_id);
    const image = product?.imagePath;

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (image && fs.existsSync(image)) {
      fs.unlinkSync(image);
    }

    await product.deleteOne();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productUpdates = req.body;
    const imagePath = req.file?.path;

    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct)
      return res.status(404).json({ message: "Product not found" });

    if (
      imagePath &&
      existingProduct.imagePath &&
      fs.existsSync(existingProduct.imagePath)
    ) {
      fs.unlinkSync(existingProduct.imagePath);
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...productUpdates,
        imagePath,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const { productName } = req.query;

    const products = await ProductModel.find({
      productName: { $regex: productName, $options: "i" },
    });

    if (products.length === 0) {
      return res.status(400).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error: any) {
    console.error("Error searching for product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
