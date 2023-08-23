import { FieldError, Resolver, useForm, Controller } from "react-hook-form";

type FormValues = {
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: string;
  paymentMethodLast4Digits: string;
};

type FormErrors = {
  [K in keyof FormValues]?: FieldError;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: FormErrors = {};

  if (values.deliveryCity === "" || values.deliveryCity.trim() === "") {
    errors.deliveryCity = {
      type: "required",
      message: "City is required",
    };
  }

  if (values.deliveryStreet === "" || values.deliveryStreet.trim() === "") {
    errors.deliveryStreet = {
      type: "required",
      message: "Street is required",
    };
  }

  if (values.deliveryDate === null) {
    errors.deliveryDate = {
      type: "required",
      message: "Shipping Date is required",
    };
  }

  if (
    !values.paymentMethodLast4Digits ||
    values.paymentMethodLast4Digits.trim() === ""
  ) {
    errors.paymentMethodLast4Digits = {
      type: "required",
      message: "Credit Card Number is required",
    };
  } else if (!/^\d+$/.test(values.paymentMethodLast4Digits)) {
    errors.paymentMethodLast4Digits = {
      type: "invalid",
      message: "Credit Card Number can only contain numbers",
    };
  } else if (
    values.paymentMethodLast4Digits.length < 13 ||
    values.paymentMethodLast4Digits.length > 19
  ) {
    errors.paymentMethodLast4Digits = {
      type: "length",
      message: "Credit Card Number should be between 13 to 19 digits",
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

export const useOrderValidation = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  return {
    register,
    handleSubmit,
    errors,
    setError,
    reset,
    setValue,
    watch,
    Controller,
    control,
  };
};
