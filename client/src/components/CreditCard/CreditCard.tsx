import { useSelector } from "react-redux";
import styles from "./CreditCard.module.css";
import { RootState } from "../../service/Store";

type CreditCardProps = {
  cardNumber: string;
};

const CreditCard = ({ cardNumber }: CreditCardProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const formatCardNumber = (number: string) => {
    // Remove all non-digits and ensure max length of 16
    let cleaned = number.replace(/\D/g, "").slice(0, 16);

    // Add space every 4 digits
    return cleaned.replace(/(\d{4})/g, "$1 ").trim();
  };

  const displayedNumber = cardNumber
    ? formatCardNumber(cardNumber)
    : "1234 1234 1234 1234";

  return (
    <div className={styles.creditCard}>
      <div className={styles.creditCard__brand}>Bank Name</div>
      <div className={styles.creditCard__chip}></div>
      <div className={styles.creditCard__number}>{displayedNumber}</div>
      <div className={styles.creditCard__info}>
        <div className={styles.creditCard__info__name}>
          <div className={styles.label}>Card Holder</div>
          <div>{fullName}</div>
        </div>
        <div className={styles.creditCard__info__expiry}>
          <div className={styles.label}>Expires</div>
          <div>10/25</div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
