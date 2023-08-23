import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/product";
import shoppingCartRoutes from "./routes/shoppingCart";
import cartItemRoutes from "./routes/cartItem";
import path from "path";
import orderRoutes from "./routes/order";

dotenv.config();

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  "/public/assets",
  express.static(path.join(__dirname, "public/assets"))
);

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/shoppingCart", shoppingCartRoutes);
app.use("/cartItem", cartItemRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`Cannot connect to database: ${error.message}`);
    process.exit(1);
  });
