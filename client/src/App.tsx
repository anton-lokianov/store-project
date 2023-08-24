import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import MainRoute from "./routes/RootLayout";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/style";
import { setProducts } from "./service/product-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "./hooks/useHttp";
import { useEffect } from "react";
import { setCartItems } from "./service/cartItem-slice";
import { RootState } from "./service/Store";
import { routes } from "./routes/MainRoutes";

function App() {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.shoppingCart?._id) ??
    "";
  const getProducts = async () => {
    try {
      const response = await sendRequest("get", "/product/");
      if (response) dispatch(setProducts(response));
    } catch (err: any) {
      console.log(err);
    }
  };

  const getAllCartItems = async () => {
    try {
      const response = await sendRequest("get", `/cartItem/${cartId}`);
      dispatch(setCartItems(response));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [dispatch]);

  useEffect(() => {
    if (cartId) {
      getAllCartItems();
    }
  }, [cartId]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </>
  );
}

export default App;
