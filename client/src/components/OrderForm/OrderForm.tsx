import { Button, TextField } from "@mui/material";
import styles from "./OrderForm.module.css";
import CreditCardComponent from "../../components/CreditCard/CreditCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../service/Store";
import useHttp from "../../hooks/useHttp";
import { useOrderValidation } from "../../hooks/validations/useOrderValidation";
import OrderModal from "../OrderModal/OrderModal";
import {
  removeShoppingCart,
  setOrderCartStatus,
  setShoppingCart,
} from "../../service/shoppingCart-slice";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { clearCart } from "../../service/cartItem-slice";

const OrderForm = () => {
  const { sendRequest } = useHttp();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    reset,
    setValue,
    watch,
    Controller,
    control,
  } = useOrderValidation();
  const [cardNumber, setCardNumber] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.shoppingCart
  );
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const cartId = shoppingCart?._id;
  const customerId = shoppingCart?.customerId;
  const [orderResponse, setOrderResponse] = useState({});

  const finalPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.generalPrice;
  }, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const resetForm = () => {
    reset();
    setCardNumber("");
  };

  useEffect(() => {
    const getBookedDate = async () => {
      const response = await sendRequest("get", "/order/getOverBookedDates");
      if (response && Array.isArray(response)) {
        setBookedDates(
          response.map((date) => dayjs(date).format("YYYY-MM-DD"))
        );
      }
    };

    getBookedDate();
  }, []);

  const isDateBooked = (dateString: string): boolean => {
    return bookedDates.includes(dayjs(dateString).format("YYYY-MM-DD"));
  };

  const onSubmit = handleSubmit(async (data) => {
    const last4digits = data.paymentMethodLast4Digits.toString().slice(-4);
    try {
      const response = await sendRequest("post", "/order/", {
        body: {
          ...data,
          paymentMethodLast4Digits: last4digits,
          finalPrice,
          cartId,
          customerId,
        },
      });
      if (response) {
        resetForm();
        setOrderResponse(response);
        setIsModalOpen(true);
        dispatch(clearCart());
        dispatch(setShoppingCart(response.newShoppingCart));
      }
    } catch (err) {
      throw err;
    }
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setOrderCartStatus());
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>Order Here</h1>
      <OrderModal
        open={isModalOpen}
        orderResponse={orderResponse}
        onClose={handleCloseModal}
      />
      <form onSubmit={onSubmit}>
        <h3>Shopping Details</h3>
        <div className={styles.form__group}>
          <TextField
            {...register("deliveryCity")}
            onDoubleClick={() => setValue("deliveryCity", user?.city ?? "")}
            placeholder="City"
            id="city"
            error={!!errors.deliveryCity}
            helperText={errors.deliveryCity?.message}
          />
          <TextField
            {...register("deliveryStreet")}
            onDoubleClick={() => setValue("deliveryStreet", user?.street ?? "")}
            placeholder="street"
            error={!!errors.deliveryStreet}
            helperText={errors.deliveryStreet?.message}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDatePicker"]}>
              <DemoItem>
                <Controller
                  name="deliveryDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDatePicker
                      value={field.value || null}
                      onChange={(date) =>
                        field.onChange(dayjs(date).format("YYYY-MM-DD"))
                      }
                      shouldDisableDate={isDateBooked}
                      disablePast
                    />
                  )}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <h3>Payment</h3>
          <TextField
            {...register("paymentMethodLast4Digits")}
            type="number"
            onChange={(e) => setCardNumber(e.target.value)}
            value={cardNumber}
            placeholder="Credit Card"
            error={!!errors.paymentMethodLast4Digits}
            helperText={errors.paymentMethodLast4Digits?.message}
          />
          <div className={styles.buttons}>
            <Button type="reset" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit">Order</Button>
          </div>
        </div>
      </form>
      <CreditCardComponent cardNumber={cardNumber} />
    </div>
  );
};

export default OrderForm;
