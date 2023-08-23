import { useState } from "react";
import { FieldError, Resolver, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  idNumber: number;
  city: string;
  street: string;
};

type FormErrors = {
  [K in keyof FormValues]?: FieldError;
};

const stepOneResolver: Resolver<FormValues> = async (values) => {
  const errors: FormErrors = {};

  if (!values.idNumber) {
    errors.idNumber = {
      type: "required",
      message: "Id Number is required",
    };
  } else if (!values.password || values.password.length < 6) {
    errors.password = {
      type: "invalid",
      message: "Password must be at least 6 characters",
    };
  }

  if (!values.password || values.password.trim() === "") {
    errors.password = {
      type: "required",
      message: "Password is required",
    };
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = {
      type: "mismatch",
      message: "Passwords must match",
    };
  }
  if (!values.email || values.email.trim() === "") {
    errors.email = {
      type: "required",
      message: "Email is required",
    };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      type: "invalid",
      message: "Email is not valid",
    };
  }
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

const stepTwoResolver: Resolver<FormValues> = async (values) => {
  const errors: FormErrors = {};

  if (!values.city || values.city.length === 0) {
    errors.city = {
      type: "required",
      message: "City is required",
    };
  }

  if (!values.street || values.street.length === 0) {
    errors.street = {
      type: "required",
      message: "Street is required",
    };
  }

  if (!values.firstName || values.firstName.length === 0) {
    errors.firstName = {
      type: "required",
      message: "First name is required",
    };
  }

  if (!values.lastName || values.lastName.length === 0) {
    errors.lastName = {
      type: "required",
      message: "Last name is required",
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

export const useRegisterValidation = () => {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: step === 0 ? stepOneResolver : stepTwoResolver,
  });

  return { register, handleSubmit, errors, setError, reset, step, setStep };
};
