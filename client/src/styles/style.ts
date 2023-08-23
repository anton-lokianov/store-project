import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a5dbdd",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#407c87",
          },
          backgroundColor: "#f5f5f5", // Default background color
          "&.Mui-focused": {
            backgroundColor: "#e0e0e0", // Background color when focused
          },
          fontSize: "16px", // Font size
          fontWeight: "500", // Font weight (medium)
          fontFamily: "sans-serif", // Font family
        },
        input: {
          // Additional styles for the input can be added here, if required.
          // Height of the input box
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#407c87", // Change this to the color you want for the focused state
          },
          color: "#303b37", // Default color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0f4953",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#0f3853",
          },
        },
      },
    },
  },
});
