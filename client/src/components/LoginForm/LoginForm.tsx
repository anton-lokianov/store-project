import useHttp from "../../hooks/useHttp";
import { useLoginValidation } from "../../hooks/validations/useLoginValidation";
import { Badge, Button, TextField } from "@mui/material";
import { RootState } from "../../service/Store";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { Login } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../service/auth-slice";
import { setShoppingCart } from "../../service/shoppingCart-slice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const LoginForm = () => {
  const { register, handleSubmit, errors, setError, reset } =
    useLoginValidation();
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const isAdmin = user?.role === "admin";

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await sendRequest("post", "/auth/login", {
        body: { ...data },
      });
      if (response) {
        dispatch(setLogin({ user: response.user, token: response.token }));
        if (response.user.role === "admin") {
          navigate("/shopping");
          return;
        }
        const res = await sendRequest(
          "get",
          `/shoppingCart/${response.user._id}`
        );
        if (res) dispatch(setShoppingCart(res));
        reset();
      }
    } catch (err: any) {
      setError("email", { message: err.response.data.message });
      setError("password", { message: err.response.data.message });
    }
  });

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <h1 className={styles.loggedTitle}>
            {!isAdmin ? "Welcome Back!" : "Hello Admin"}
          </h1>
          <p>
            You are signed in.{" "}
            {!isAdmin ? (
              <>
                {cartItems.length > 0 ? "Continue Shopping" : "Start Shopping"}{" "}
                now!
              </>
            ) : (
              "You can now manage your products"
            )}
          </p>
          <Button
            onClick={async () => {
              navigate("/shopping");
              window.scrollTo(0, 0);
            }}
          >
            {!isAdmin ? (
              <>
                {cartItems.length > 0 ? "Continue Shopping" : "Start Shopping"}
              </>
            ) : (
              "Manage Products"
            )}
          </Button>
          {isAdmin && (
            <AdminPanelSettingsIcon
              fontSize="large"
              sx={{
                color: "#407c87",
                mt: "3rem",
              }}
            />
          )}
          {!isAdmin && (
            <Badge
              color="warning"
              badgeContent={cartItems.length}
              sx={{
                mt: "3rem",
              }}
            >
              <ShoppingCartIcon
                fontSize="large"
                sx={{
                  color: "#407c87",
                }}
              />
            </Badge>
          )}
        </>
      ) : (
        <>
          <h1>Sign - In</h1>
          <Login />
          <div className={styles.form__container}>
            <form onSubmit={onSubmit}>
              <TextField
                sx={{ mb: "1.5rem" }}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                {...register("email")}
                fullWidth
              />
              <TextField
                sx={{ mb: "1.5rem" }}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                {...register("password")}
                fullWidth
              />
              <div className={styles.buttonsContainer}>
                <Button type="submit">Sign - In</Button>
                <Button type="reset" onClick={() => reset()}>
                  Reset
                </Button>
              </div>
              <div>
                Don't have an Account? Register{" "}
                <NavLink to="/register">here</NavLink>
              </div>
            </form>
            <h2>Sign in to enjoy our products</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
