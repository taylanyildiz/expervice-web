import Cards, { ReactCreditCardsProps } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

// Credit focuses
export type CreditFocus = "cvc" | "name" | "number" | "expiry";

function CrediCard(props: ReactCreditCardsProps) {
  return <Cards {...props} />;
}

export default CrediCard;
