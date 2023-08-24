import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./Navbar.module.css";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../service/Store";
import Menu from "@mui/material/Menu";
import { useEffect, useRef, useState } from "react";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { setLogout } from "../../service/auth-slice";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useHttp from "../../hooks/useHttp";
import { useDebounce } from "../../hooks/useDebounce";
import {
  removeShoppingCart,
  setOrderCartStatus,
} from "../../service/shoppingCart-slice";
import { searchProduct } from "../../service/product-slice";
import { resetSelectedCategory } from "../../service/category-slice";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:957px)");
  const user = useSelector((state: RootState) => state.auth.user);
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const navigate = useNavigate();
  const location = useLocation();
  const { sendRequest } = useHttp();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const products = useSelector((state: RootState) => state.product.products);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const hasDispatched = useRef(false);
  const dispatch = useDispatch();
  const orderStatus = useSelector(
    (state: RootState) => state.shoppingCart.orderCartStatus
  );
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const isAdmin = user?.role === "admin";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(removeShoppingCart());
    handleClose();
    if (orderStatus) {
      dispatch(setOrderCartStatus());
    }
    navigate("/");
  };

  const handleStartShopping = () => {
    handleClose();
    navigate("/shopping");
  };

  const handleSearchProduct = async () => {
    try {
      const response = await sendRequest(
        "get",
        `/product/searchProduct?productName=${searchTerm}`
      );
      hasDispatched.current = false;
      dispatch(searchProduct(response));
      dispatch(resetSelectedCategory());
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedCategory && !hasDispatched.current) {
      dispatch(searchProduct(products));
      hasDispatched.current = true;
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    handleSearchProduct();
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.container__left}>
        <h1 onClick={() => navigate("/")}>Super - Store</h1>
        {location.pathname === "/shopping" && !orderStatus && (
          <div className={styles.searchBar}>
            <TextField
              type="search"
              placeholder="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                console.log(e);
              }}
              value={searchTerm}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "2.4rem",
                  width: "21rem",
                  borderRadius: "0.7rem",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.navbarRight}>
        <div className={styles.navbarRight__item}>
          <span>Contact use : superStore@gmail.com</span>
          {user && (
            <span
              style={{ cursor: "pointer" }}
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Welcome {fullName}
              <SentimentSatisfiedAltIcon
                style={{ fontSize: "0.9rem", marginLeft: "0.2rem" }}
              />
            </span>
          )}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {location.pathname !== "/shopping" && !isAdmin && (
              <MenuItem onClick={handleStartShopping}>
                {cartItems.length === 0
                  ? "Start Shopping"
                  : "Continue Shopping"}
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          {!user && (
            <span>
              Hello Guest{" "}
              <SentimentSatisfiedAltIcon
                style={{ fontSize: "0.9rem", marginLeft: "0.2rem" }}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
