import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../models/CartItem";

interface CartItemState {
  cartItems: CartItem[];
}

const initialState: CartItemState = {
  cartItems: [],
};

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const id = action.payload._id;
      if (id) {
        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        } else {
          state.cartItems.push(action.payload);
        }
      }
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    deleteItem: (
      state,
      action: PayloadAction<{ cartId: string; productId: string }>
    ) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.cartId !== action.payload.cartId ||
          item.productId !== action.payload.productId
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, setCartItems, deleteItem, clearCart } =
  cartItemSlice.actions;

export default cartItemSlice.reducer;
