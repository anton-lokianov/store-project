import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { RootState } from "../service/Store";
import moment from "moment";

export const useDownloadReceipt = () => {
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const products = useSelector((state: RootState) => state.product.products);
  const orderItems = products.filter((product) =>
    cartItems.some((cart) => cart.productId === product._id)
  );

  const itemsList = orderItems
    .map((item) => {
      const cartItem = cartItems.find((cart) => cart.productId === item._id);
      const quantity = cartItem?.quantity || 1;
      return `${item.productName},Quantity: ${quantity}, Price: \u20AA${item.price}`;
    })
    .join("\n");

  const downloadReceipt = (orderDetails: any) => {
    const orderDate = moment().format("DD/MM/YYYY, HH:mm:ss");

    const deliveryDate = moment(orderDetails.deliveryDate).format("DD/MM/YYYY");
    const receipt = `
    Receipt
    --------------------------------
    Order Number: ${orderDetails._id}
    Date: ${orderDate}
    Delivery Date:${deliveryDate}
    deliveryCity: ${orderDetails.deliveryCity}
    deliveryStreet: ${orderDetails.deliveryStreet}
    
    ${itemsList}

    Total Amount: ${orderDetails.finalPrice}
    Payment: **** **** **** ${orderDetails.paymentMethodLast4Digits}

    
  
    Thank you for shopping with us!
    `;
    const blob = new Blob([receipt], { type: "application/txt" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
