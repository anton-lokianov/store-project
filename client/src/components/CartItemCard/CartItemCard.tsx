import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../models/CartItem";
import styles from "./CartItemCard.module.css";
import { RootState, store } from "../../service/Store";
import { Product } from "../../models/Product";
import InputCart from "../InputCart/InputCart";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { Button, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { addItem, deleteItem } from "../../service/cartItem-slice";
import React from "react";

type CartItemCardProps = {
  cartItem: CartItem;
  searchQuery: string;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem,
  searchQuery,
}) => {
  const { _id, productId, quantity, generalPrice, cartId } = cartItem;
  const product = useSelector((state: RootState) =>
    state.product.products.find((product: Product) => product._id === productId)
  );
  const [value, setValue] = useState(quantity);
  const { productName, imagePath, price } = product ?? {};
  const { sendRequest } = useHttp();
  const [showButton, setShowButton] = useState(false);
  const safePrice = price ?? 0;
  const dispatch = useDispatch();
  const orderStatus = useSelector(
    (state: RootState) => state.shoppingCart.orderCartStatus
  );

  const highlightedName = product?.productName
    .split(new RegExp(`(${searchQuery})`, "gi"))
    .map((str, i) => {
      if (str.toLowerCase() === searchQuery.toLowerCase() && searchQuery) {
        return (
          <span key={i} style={{ backgroundColor: "#407c87" }}>
            {str}
          </span>
        );
      }
      return str;
    });

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleQuantityChange = (newValue: number) => {
    if (newValue !== quantity) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleUpdateItem = async () => {
    try {
      const response = await sendRequest(
        "put",
        `/cartItem/${cartId}/${productId}`,
        {
          body: {
            quantity: value,
            generalPrice: value * safePrice,
          },
        }
      );
      if (response) {
        dispatch(addItem(response));
        setShowButton(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const response = await sendRequest(
        "delete",
        `/cartItem/${cartId}/${productId}`
      );
      if (response) {
        dispatch(deleteItem({ cartId, productId }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCart}>
          <div className={styles.product__name}>{highlightedName}</div>
          <img src={`http://localhost:4000/${imagePath}`} alt={productName} />
        </div>
        <div className={styles.rightCard}>
          {!orderStatus && (
            <div className={styles.deleteButton}>
              <IconButton onClick={handleDeleteItem}>
                <DeleteIcon sx={{ color: "#0f3853" }} />
              </IconButton>
            </div>
          )}
          {!orderStatus && (
            <div
              className={
                showButton
                  ? `${styles.updateButton} ${styles.animate}`
                  : styles.updateButton
              }>
              {showButton && (
                <IconButton onClick={handleUpdateItem}>
                  <SyncAltIcon />
                </IconButton>
              )}
            </div>
          )}
          {!orderStatus ? (
            <div className={styles.product__quantity}>
              <InputCart
                value={value}
                onChange={setValue}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          ) : (
            <div className={styles.product__quantity}>
              <span className={styles.quantity}>Amount: {quantity}</span>
            </div>
          )}
          <div className={styles.product__price}>
            &#8362; {generalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
