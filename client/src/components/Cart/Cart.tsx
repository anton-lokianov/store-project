import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../service/Store";
import styles from "./Cart.module.css";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import CartItemCard from "../CartItemCard/CartItemCard";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { setCartItems } from "../../service/cartItem-slice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion, AnimatePresence } from "framer-motion";
import { setOrderCartStatus } from "../../service/shoppingCart-slice";

const fadeOutVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: "-30px", transition: { duration: 0.4 } },
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Cart = () => {
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.shoppingCart?._id) ??
    "";
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const orderStatus = useSelector(
    (state: RootState) => state.shoppingCart.orderCartStatus
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout; // Define timeout outside the event listener

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        setSearchQuery((prevQuery) => prevQuery + event.key);

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
          setSearchQuery("");
        }, 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.generalPrice,
      0
    );
    setTotalAmount(totalAmount);
  }, [cartItems]);

  const handleClearCart = async () => {
    try {
      const response = await sendRequest(
        "delete",
        `/cartItem/allCartItems/${cartId}`
      );
      if (response) {
        setTimeout(() => {
          dispatch(setCartItems([]));
        }, 400);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>
      <div className={styles.total__amount}>
        {cartItems.length === 0 ? (
          <h3>Cart is empty</h3>
        ) : (
          <>
            <div>Total Price : &#8362; {totalAmount.toFixed(2)}</div>
            <div className={styles.cartButtons}>
              {!orderStatus && (
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: "",
                    },
                  }}
                  onClick={handleClearCart}
                  endIcon={<ClearIcon />}>
                  clear-cart
                </Button>
              )}
              <Button
                onClick={() => dispatch(setOrderCartStatus())}
                sx={{
                  "&:hover": {
                    backgroundColor: "",
                  },
                }}
                endIcon={<ShoppingCartIcon />}>
                {orderStatus ? "Back to Cart" : "Place Order"}
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={styles.cart__items}>
        <AnimatePresence>
          {cartItems.map((cartItem) => (
            <motion.div
              key={cartItem._id}
              initial="hidden" // Start with the hidden state from fadeInVariants
              animate="visible" // Animate to the visible state from fadeInVariants
              exit="hidden" // On exit, animate to the hidden state from fadeOutVariants
              variants={{ ...fadeInVariants, ...fadeOutVariants }}>
              <CartItemCard cartItem={cartItem} searchQuery={searchQuery} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;
