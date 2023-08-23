import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { RootState } from "../../service/Store";

type InputCartProps = {
  value: number;
  onChange: (value: number) => void;
  onQuantityChange?: (value: number) => void;
};

const InputCart: React.FC<InputCartProps> = ({
  value,
  onChange,
  onQuantityChange,
}) => {
  const handleDecrease = () => {
    const newValue = value > 1 ? value - 1 : value;
    onChange(newValue);
    if (onQuantityChange) onQuantityChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = value < 99 ? value + 1 : value;
    onChange(newValue);
    if (onQuantityChange) onQuantityChange(newValue);
  };

  return (
    <div
      className="numberInput"
      style={{
        marginTop: "1rem",
        marginBottom: "-1rem",
      }}>
      <IconButton
        onClick={handleDecrease}
        color="default"
        aria-label="decrease product">
        <RemoveIcon />
      </IconButton>

      <TextField
        id="productQuantity"
        type="number"
        value={value}
        sx={{
          "& input": {
            maxWidth: "1.3rem",
            maxHeight: "0.1rem",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
            textAlign: "center",
          },
        }}
      />

      <IconButton
        onClick={handleIncrease}
        color="default"
        aria-label="increase product">
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default InputCart;
