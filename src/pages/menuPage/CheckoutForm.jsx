import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/ThemeContext";
import { SiPhonepe } from "react-icons/si";
import { FaMoneyBillAlt } from "react-icons/fa";

const CheckoutForm = ({price, cart}) => {
  const { isDarkMode } = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [address, setAddress] = useState("");

  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const navigate = useNavigate();

  console.log(user.email)

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.error('Invalid price value. Must be a number greater than or equal to 1.');
      return;
    }
  
    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        console.log(res.data.clientSecret);
        console.log(price);
        setClientSecret(res.data.clientSecret);
      })
  }, [price, axiosSecure]);

  // handleSubmit btn click
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // console.log('card: ', card)
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setcardError(error.message);
    } else {
      // setcardError('Success!');
      // console.log('[PaymentMethod]', paymentMethod);
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
          },
        },
      },
    );

    if(confirmError){
      console.log(confirmError)
    }

    console.log('paymentIntent', paymentIntent)

    if(paymentIntent.status ==="succeeded") {
      const transitionId =paymentIntent.id;
      setcardError(`Your transitionId is: ${transitionId}`)

      // save payment info to server
      const paymentInfo ={email: user.email, transitionId: paymentIntent.id, price,  quantity: cart.length,
        status: "order pending", address,  itemsName: cart.map(item => item.name, item.quantity), cartItems: cart.map(item => item._id), menuItems: cart.map(item => item.menuItemId)}
         console.log(paymentInfo)
      // send payment info
      axiosSecure.post('/payments', paymentInfo)
      .then( res => {
        console.log(res.data)
        if(res.data){
          alert('Order Sucessful! Thankyou For Order :)')
          navigate('/order')
        }
      })
    }


  };

   // Handle payment with PhonePe
   const handlePhonePePayment = async () => {
    try {
      // Validate address
    if (!address) {
      alert('Please provide your address.');
      return; // Stop further execution if address is not provided
    }
      // Call PhonePe API to process the payment
      // Replace 'phonePePaymentAPI' with your actual API endpoint for PhonePe payment
      const response = await axiosSecure.post('/phonePePaymentAPI', {
        email: user.email, // Replace with actual user email
        price,
        cart,
        address,
      });

      if (response.data.success) {
        alert('Payment done successfully!');
        navigate('/order');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing PhonePe payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

// Handle payment with Cash on Delivery
const handleCashOnDelivery = async () => {
  try {
    // Validate address
    if (!address) {
      alert('Please provide your address.');
      return; // Stop further execution if address is not provided
    }

    // Call API to process Cash on Delivery payment
    const response = await axiosSecure.post("/payments/cash-on-delivery", {
      email: user.email, // Replace with actual user email
      price,
      cart,
      address,
    });

    if (response.data.success) {
      // If payment successful, set transaction ID as "Cash on delivery"
      const transitionId = "Cash on delivery";
      setcardError(`Your transaction ID is: ${transitionId}`);
      alert("Order Successful! Thank you For Order :)");  
      navigate("/order");
    } else {
      alert("Payment failed. Please try again.");
    }
  } catch (error) {
    console.error("Error processing Cash on Delivery payment:", error);
  }
};



  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ₹{price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      <div className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 ${isDarkMode ? 'dark' : ''}`}>
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          placeholder="Please Provide Full Adress!!"
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          required
        />
      </div>
      <br/>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="btn btn-primary btn-sm mt-5 w-full"
        >
          Pay with card
        </button>
        <button
          type="submit"
          onClick={handleCashOnDelivery}
          className="btn btn-primary btn-sm mt-5 w-full"
        >
          <FaMoneyBillAlt /> Pay with Cash on Delivery
        </button>
        <div className="mt-5 text-center">
      <hr />
      <button
          type="submit"
          onClick={handlePhonePePayment}
          className="btn  btn-sm mt-5 bg-orange-500 text-white"
        >
         <SiPhonepe /> Pay with PhonePay
        </button>
      </div>
        </form>
      {cardError ? <p className="text-red text-xs italic">{cardError}</p> : ''}
     
     
      </div>
    </div>
  );
};

export default CheckoutForm;
