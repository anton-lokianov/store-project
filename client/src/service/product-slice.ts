import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";

interface ProductState {
  products: Product[];
  searchableProducts: Product[];
  productToEdit: Product | null;
}

const initialState: ProductState = {
  products: [],
  searchableProducts: [],
  productToEdit: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.searchableProducts = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.searchableProducts.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );

      state.searchableProducts = state.searchableProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },
    searchProduct: (state, action: PayloadAction<Product[]>) => {
      state.searchableProducts = action.payload;
    },

    setProductToEdit: (state, action: PayloadAction<Product | null>) => {
      state.productToEdit = action.payload;
    },
  },
});

// Destructure the actions and the reducer from the slice
export const {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  setProductToEdit,
} = productSlice.actions;

export default productSlice.reducer;
