import { Document, model, Schema } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email?: string;
  idNumber?: number; // Primary key
  password?: string;
  city?: string;
  street?: string;
  role?: string;
}

export interface Category extends Document {
  categoryName: string;
}

export interface Product extends Document {
  productName: string;
  categoryId: Schema.Types.ObjectId; // Foreign key referencing Category
  price: number;
  imagePath: string;
}

export interface ShoppingCart extends Document {
  customerId: Schema.Types.ObjectId; // Foreign key referencing Customer
  createdAt: Date;
}

export interface CartItem extends Document {
  productId: Schema.Types.ObjectId; // Foreign key referencing Product
  quantity: number;
  generalPrice: number;
  cartId: Schema.Types.ObjectId; // Foreign key referencing ShoppingCart
}

export interface Order extends Document {
  customerId: Schema.Types.ObjectId | null; // Optional foreign key referencing Customer
  cartId: Schema.Types.ObjectId; // Foreign key referencing ShoppingCart
  finalPrice: number;
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: Date;
  orderExecutionDate: Date;
  paymentMethodLast4Digits: string;
}

const UserSchema = new Schema<User>({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, minlength: 3 },
  idNumber: { type: Number, required: true, unique: true }, // Primary key
  password: { type: String, required: true, minlength: 3 },
  city: { type: String, required: false },
  street: { type: String, required: false },
  role: { type: String, required: true, default: "customer" },
});

const CategorySchema = new Schema<Category>({
  categoryName: { type: String, required: true },
});

const ProductSchema = new Schema<Product>({
  productName: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Foreign key referencing Category
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
});

const ShoppingCartSchema = new Schema<ShoppingCart>({
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key referencing Customer
  createdAt: { type: Date, default: Date.now },
});

const CartItemSchema = new Schema<CartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Foreign key referencing Product
  quantity: { type: Number, required: true },
  generalPrice: { type: Number, required: true },
  cartId: { type: Schema.Types.ObjectId, ref: "ShoppingCart", required: true }, // Foreign key referencing ShoppingCart
});

const OrderSchema = new Schema<Order>({
  customerId: { type: Schema.Types.ObjectId, ref: "User", default: null }, // Optional foreign key referencing Customer
  cartId: { type: Schema.Types.ObjectId, ref: "ShoppingCart", required: true }, // Foreign key referencing ShoppingCart
  finalPrice: { type: Number, required: true },
  deliveryCity: { type: String, required: true },
  deliveryStreet: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  orderExecutionDate: { type: Date, default: Date.now },
  paymentMethodLast4Digits: { type: String, required: true },
});

export const UserModel = model<User>("User", UserSchema);
export const CategoryModel = model<Category>("Category", CategorySchema);
export const ProductModel = model<Product>("Product", ProductSchema);
export const ShoppingCartModel = model<ShoppingCart>(
  "ShoppingCart",
  ShoppingCartSchema
);
export const CartItemModel = model<CartItem>("CartItem", CartItemSchema);
export const OrderModel = model<Order>("Order", OrderSchema);
