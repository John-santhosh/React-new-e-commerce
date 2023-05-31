import styled from "styled-components";
import user from "../assets/userpic.jpg";
import Hero from "./Hero";
import { useUserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/Config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useProductsProvider } from "../context/ProductsContext";
const MyAccount = () => {
  const { current_user, signOut: logOut, userLogged } = useUserContext();
  const { cart, total_Price } = useCartContext();
  const { wishlisted } = useProductsProvider();
  return (
    <Wrapper>
      <Hero page="Profile"></Hero>
      <div className="section-center d-grid">
        <img src={user} alt="" />
        {userLogged ? (
          <div className="text-center ">
            <h2>Hi, {current_user}</h2>

            <div className="d-flex gap-4 justify-content-center my-4 text-capitalize">
              <div className="fs-5">
                cart <br />
                <span className="text-primary">{cart.length}</span>
              </div>
              <div className="fs-5">
                WishList <br />
                <span className="text-primary">{wishlisted.length}</span>
              </div>
              <div className="fs-5">
                Total <br />
                <span className="text-primary">{total_Price}</span>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/checkout">
                <button className="btn rounded-5 px-5 ">checkout</button>
              </Link>
              <button
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      logOut();
                      toast.success("Logout Success");
                    })
                    .catch((error) => {
                      toast.success("An error happened");
                      // An error happened.
                    });
                }}
                className="rounded-5 btn btn-solid px-5"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2>Please Login to Continue</h2>
            <Link className="btn rounded-5 px-5 my-4 btn-solid" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .section-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border: 2px solid black;
    padding: 0.5rem;
    gap: 2rem;
  }
  @media only screen and (max-width: 768px) {
    .section-center {
      grid-template-columns: unset;
      /* grid-template-rows: 1fr 4fr; */
    }
  }
  @media only screen and (min-width: 1400px) {
    .section-center {
      max-width: 1200px;
    }
  }
`;
export default MyAccount;
