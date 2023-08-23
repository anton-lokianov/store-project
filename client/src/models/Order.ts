export interface Order {
  _id?: string;
  customerId: string;
  cartId: string;
  finalPrice: number;
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: string;
  orderExecutionDate: Date;
  paymentMethodLast4Digits: string;
}
