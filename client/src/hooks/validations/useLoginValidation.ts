import { FieldError, Resolver, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = {
  [K in keyof FormValues]?: FieldError;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: FormErrors = {};

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

  if (!values.password || values.password.length === 0) {
    errors.password = {
      type: "required",
      message: "Password is required",
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

export const useLoginValidation = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  return { register, handleSubmit, errors, setError, reset };
};
