import styled from "styled-components";
import Hero from "../components/Hero";
import { StripeCheckoutPage } from "../components/index";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {

  const { cart } = useCartContext();
  return (
    <Wrapper>
      <Hero page="checkout" />
      <div className="section-center">
        {false ? (
          <span className="empty">
            <h2>Your car is empty</h2>
            <Link className="btn btn-solid py-1" to="/products">
              Fill it
            </Link>
          </span>
        ) : (
          <StripeCheckoutPage />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .empty {
    display: grid;
    place-items: center;
  }
`;
export default Checkout;
