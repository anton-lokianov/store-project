import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useState } from "react";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { useRegisterValidation } from "./../hooks/validations/useRegisterValidation";

export const Register = () => {
  const steps = ["User settings", "User information"];
  const [activeStep, setActiveStep] = useState(0);
  const { register, handleSubmit, errors, step, setStep, setError } =
    useRegisterValidation();
  const { sendRequest } = useHttp();

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStep(step - 1);
  };

  const firstStepSubmit = handleSubmit(async (data) => {
    try {
      const response = await sendRequest(
        "get",
        `/auth/checkIfEmailAndIdExist/${data.email}/${data.idNumber}`
      );
      if (response) {
        handleNext();
      }
    } catch (err: any) {
      if (err.response.data.idNumber) {
        setError("idNumber", { message: err.response.data.idNumber });
      }
      if (err.response.data.email) {
        setError("email", { message: err.response.data.email });
      }
    }
  });

  const secondStepSubmit = handleSubmit((data) => {
    setFormData(() => ({ ...data }));
    handleNext();
  });

  const handleRegister = async () => {
    try {
      const response = await sendRequest("post", "/auth/register", {
        body: { ...formData },
      });
      if (response) {
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: {
          xs: "90%", // 90% width on extra-small screens and up
          sm: "70%", // 70% width on small screens and up
          md: "50%", // 50% width on medium screens and up
          lg: "40%", // 40% width on large screens and up
        },
        margin: "0 auto",
        transform: "translateY(10rem)",
      }}>
      <Typography
        variant="h3"
        gutterBottom
        className="purpleText"
        sx={{ textAlign: "center" }}>
        Register
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleRegister}>Create Account</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <Box>
              <form
                style={{
                  display: "flex",
                  width: "32rem",
                  margin: "auto",
                  flexDirection: "column",
                  gap: "1rem",
                  backgroundColor: "#f5f5f5",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
                onSubmit={firstStepSubmit}>
                <TextField
                  {...register("idNumber")}
                  label="Id Number"
                  type="number"
                  error={!!errors.idNumber}
                  helperText={errors.idNumber?.message}
                  fullWidth
                />
                <TextField
                  {...register("email")}
                  label="Email"
                  type="text"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
                <TextField
                  {...register("password")}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
                <TextField
                  {...register("confirmPassword")}
                  label="Confirm Password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  fullWidth
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}>
                  <Button type="submit">Next</Button>
                </Box>
              </form>
            </Box>
          )}
          {activeStep === 1 && (
            <div className="secondStepInputs">
              <form
                style={{
                  display: "flex",
                  width: "32rem",
                  margin: "auto",
                  flexDirection: "column",
                  gap: "1rem",
                  backgroundColor: "#f5f5f5",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
                onSubmit={secondStepSubmit}>
                <TextField
                  {...register("city")}
                  name="city"
                  label="City"
                  type="string"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                />
                <TextField
                  {...register("street")}
                  label="Street"
                  type="text"
                  error={!!errors.street}
                  helperText={errors.street?.message}
                  fullWidth
                />
                <TextField
                  {...register("firstName")}
                  label="First Name"
                  type="string"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                />
                <TextField
                  {...register("lastName")}
                  label="Last Name"
                  type="string"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button color="inherit" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit">Finish</Button>
                </Box>
              </form>
            </div>
          )}
        </React.Fragment>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
        <Button onClick={() => navigate("/")}>Go back to home page</Button>
      </Box>
    </Box>
  );
};

export default Register;
