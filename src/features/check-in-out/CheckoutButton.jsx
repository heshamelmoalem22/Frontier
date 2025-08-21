import Button from "../../ui/Button";
import { useCheckout } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckOut } = useCheckout();
  return (
    <Button onClick={()=>checkOut(bookingId)} style={{fontSize:"11px"}} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
