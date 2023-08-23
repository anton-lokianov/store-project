import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategory: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    resetSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

// Destructure the actions and the reducer from the slice
export const { setSelectedCategory, resetSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
