import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/Store";

export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = new UserModel(user);

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || !user.password || !user.email) {
      return res
        .status(404)
        .json({ message: "Please check your Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Please check your Email or Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.idNumber;
    delete userObj.email;

    res.status(200).json({ user: userObj, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const checkIfEmailAndIdExist = async (req: Request, res: Response) => {
  const { email, idNumber } = req.params;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    const existingUserId = await UserModel.findOne({ idNumber: idNumber });

    let errors = {};

    if (existingUserId)
      errors = { ...errors, idNumber: "ID number already in use" };

    if (existingUser) errors = { ...errors, email: "Email already in use" };

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    res.status(200).json({ message: "OK" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
