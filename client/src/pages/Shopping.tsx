import { Resizable } from "re-resizable";
import Products from "../components/Products/Products";
import { Box, useMediaQuery } from "@mui/material";
import ProductForm from "../components/ProductForm/ProductForm";
import Cart from "../components/Cart/Cart";
import { RootState } from "../service/Store";
import { useSelector } from "react-redux";
import OrderForm from "../components/OrderForm/OrderForm";

const Shopping = () => {
  const isMobile = useMediaQuery("(max-width:957px)");
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role === "admin";
  const orderStatus = useSelector(
    (state: RootState) => state.shoppingCart.orderCartStatus
  );

  return (
    <>
      {!isMobile ? (
        <Box display="grid" gridTemplateColumns="2fr 4fr">
          <Box sx={{ mt: "6rem" }} gridColumn="1 / 2">
            {userRole ? <ProductForm /> : <Cart />}
          </Box>

          <Box gridColumn="2 / 3" sx={{ mt: "6rem" }}>
            {orderStatus ? <OrderForm /> : <Products />}
          </Box>
        </Box>
      ) : (
        <>
          <Products />
          {/* <ProductForm /> */}
        </>
      )}
    </>
  );
};

export default Shopping;
