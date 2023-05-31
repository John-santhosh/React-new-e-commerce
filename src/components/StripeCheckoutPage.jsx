import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import axios from "axios";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const CheckoutForm = () => {
//   const { total_Price, clearCart } = useCartContext();
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientState] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const handleSubmit = () => {};
//   const paymentElementOptions = {
//     layout: "tabs",
//   };
//   const cardStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };
//   const handleChange = (e) => {};
//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <CardElement
//         id="card-element"
//         options={cardStyle}
//         onChange={handleChange}
//       />
//       <button disabled={processing || disabled || succeeded} id="submit">
//         <span id="button-text">
//           {processing ? <div className="spinner" id="spinner"></div> : "pay"}
//         </span>
//       </button>
//       {error && <div className="card-error" role=" alert"></div>}

//       <p className={succeeded ? "result-message" : "result-message hidden"}>
//         payment succeeded, see the result in your{" "}
//         <a href={"https://dashboard.stripe.com/test/payments"}>
//           Stripe dashboard
//         </a>
//       </p>
//     </form>
//   );
// };

import CheckoutForm from "./StripeCheckoutForm";
const StripeCheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { total_Price } = useCartContext();
  const createPaymentIntent = async () => {
    console.log("received payment req => from stripe checkout");
    try {
      const res = await axios.post(
        ".netlify/functions/create-payment-intent",
        JSON.stringify({ total_Price })
      );
      console.log(res.data);
      setClientSecret(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    createPaymentIntent();
    // const res = axios.get()
  }, []);
  return (
    <Wrapper>
      {clientSecret !== "" && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  .result-message {
    display: block;
  }
  .hidden {
    display: none;
  }
  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;

export default StripeCheckoutPage;
