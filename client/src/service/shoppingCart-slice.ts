import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCart } from "../models/ShoppingCart";

interface ShoppingCartState {
  shoppingCart: ShoppingCart | null;
  orderCartStatus: boolean;
}

const initialState: ShoppingCartState = {
  shoppingCart: null,
  orderCartStatus: false,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setShoppingCart: (state, action: PayloadAction<ShoppingCart>) => {
      state.shoppingCart = action.payload;
    },
    removeShoppingCart: (state) => {
      state.shoppingCart = null;
    },
    setOrderCartStatus: (state) => {
      state.orderCartStatus = !state.orderCartStatus;
    },
  },
});

export const { setShoppingCart, removeShoppingCart, setOrderCartStatus } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
