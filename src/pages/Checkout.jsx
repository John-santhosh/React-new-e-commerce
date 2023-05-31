import styled from "styled-components";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { useState } from "react";

const Checkout = () => {
  return (
    <Wrapper>
      <Hero page="checkout"></Hero>
      <div className="section-center">
        <div className="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        </div>
        <form action="/create-checkout-session" method="POST">
          <button type="submit">Checkout</button>
        </form>
      </div>
    </Wrapper>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
export function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <Checkout />;
}
const Wrapper = styled.section`
  min-height: 100vh;
`;
export default Checkout;
