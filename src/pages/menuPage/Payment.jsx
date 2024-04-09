import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

// outside of a component’s render to avoid
const stripePromise = loadStripe('pk_test_51Ot2QtSIBQZVLj4aJ9EtSZhGoTrBNKgQn8BvUVgnILCcrc0LmNhpDhAI0DllgaIwOrr1DNqSn9DWznmYbx8IFg1u00LTNzHFA3');

const Payment = () => {
  const [cart] = useCart();

   // Calculate the cart price
   const cartTotal = cart.reduce((sum, item) => sum +item.quantity* item.price, 0);
   const totalPrice = parseFloat(cartTotal.toFixed(2));
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart}/>
      </Elements>
    </div>
  );
};

export default Payment;
