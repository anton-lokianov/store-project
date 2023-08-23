import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../models/Product";
import InputCart from "../InputCart/InputCart";
import { Box, IconButton } from "@mui/material";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../service/Store";
import { CartItem } from "../../models/CartItem";
import { addItem } from "../../service/cartItem-slice";
import EditIcon from "@mui/icons-material/Edit";
import { setProductToEdit } from "../../service/product-slice";

type ProductCardProps = {
  product: Product;
};

export default function ImgMediaCard(props: ProductCardProps) {
  const { sendRequest } = useHttp();
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.shoppingCart?._id) ??
    "";
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const handleAddToCart = async (cartItem: CartItem) => {
    try {
      const response = await sendRequest(
        "post",
        `/cartItem/${cartItem.cartId}/`,
        {
          body: { ...cartItem },
        }
      );
      dispatch(addItem(response));
      setQuantity(1);
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = async () => {
    dispatch(setProductToEdit(props.product));
  };

  return (
    <>
      <Card
        sx={{
          width: 180,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}>
        <CardMedia
          sx={{ height: 120, width: 120, objectFit: "contain", margin: "auto" }}
          component="img"
          alt="product"
          image={`http://localhost:4000/${props.product.imagePath}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            &#8362; {props.product.price.toFixed(2)}
          </Typography>
          {!isAdmin && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <InputCart value={quantity} onChange={setQuantity} />
            </Box>
          )}
          {isAdmin && (
            <Box sx={{ position: "relative", mt: "-2rem", ml: "7.5rem" }}>
              <IconButton onClick={editProduct}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </CardContent>
        {!isAdmin && (
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                handleAddToCart({
                  productId: props.product._id,
                  generalPrice: props.product.price * quantity,
                  quantity: quantity,
                  cartId: cartId,
                });
              }}
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid lightgrey",
                color: "black",
                "&:hover": {
                  color: "white",
                },
              }}>
              Add To Cart
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
}
