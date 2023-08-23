import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Modal from "@mui/material/Modal";
import { useDownloadReceipt } from "../../hooks/useDownloadReceipt";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 3,
};

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  orderResponse?: {};
}

function OrderModal({ open, onClose, orderResponse }: OrderModalProps) {
  const { downloadReceipt } = useDownloadReceipt();
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <CheckCircleOutlineIcon
          color="primary"
          style={{ fontSize: 60, display: "block", margin: "0 auto" }}
        />
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Your order is complete!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Thank you for shopping with us! Your order has been placed and will be
          processed shortly. To download your receipt,{" "}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            mt: 1,
            textAlign: "center",
          }}
          onClick={() => downloadReceipt(orderResponse)}>
          click here
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onClose}
          style={{ marginTop: "16px" }}>
          Back to home
        </Button>
      </Box>
    </Modal>
  );
}

export default OrderModal;
