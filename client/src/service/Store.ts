import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./auth-slice"; // Assuming you renamed this
import productSlice from "./product-slice";
import storage from "redux-persist/lib/storage";
import shoppingCartSlice from "./shoppingCart-slice";
import cartItemSlice from "./cartItem-slice";
import categorySlice from "./category-slice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const shoppingCartPersistConfig = {
  key: "shoppingCart",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedShoppingCartReducer = persistReducer(
  shoppingCartPersistConfig,
  shoppingCartSlice
);

const rootReducer = {
  auth: persistedAuthReducer,
  product: productSlice,
  shoppingCart: persistedShoppingCartReducer,
  cartItem: cartItemSlice,
  category: categorySlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
