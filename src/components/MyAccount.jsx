import styled from "styled-components";

import user from "../assets/userpic.jpg";
import Hero from "./Hero";
import { signOut } from "firebase/auth";
import { auth } from "../config/Config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";
import { useProductsProvider } from "../context/ProductsContext";

import { ImUser } from "react-icons/im";
import { SlLogout } from "react-icons/sl";
import { useState } from "react";

const MyAccount = () => {
  const { current_user, signOut: logOut, userLogged } = useUserContext();
  const { cart, total_Price, clearCart } = useCartContext();
  const { wishlisted } = useProductsProvider();

  const [tab, setTab] = useState(1);
  return (
    <Wrapper>
      <Hero page="Profile"></Hero>
      <div className="section-center d-md-grid mb-5">
        <div className="d-flex p-2 align-items-center gap-3">
          <img
            src="https://img.icons8.com/?size=96&id=Eidz314LhGsr&format=png"
            alt=""
          />
          <div className="">
            <small>Hello,</small>
            <p>
              <strong>{"John123"}</strong>
            </p>
          </div>
        </div>
        <div className="p-3 my-md-0 my-3">
          <div className="">
            <div className="mt-4 mb-3">
              <h6 className="mb-2">
                Personal Information{" "}
                <button className="ms-4 text-primary px-2 rounded-5">
                  Edit
                </button>
              </h6>
              <div className="form-group">
                <div className="d-flex ">
                  <div className="col-sm-6 pe-4">
                    <input
                      type="text"
                      className="form-control"
                      id="inputFullName"
                      name="full-name"
                      disabled
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputFullName"
                      disabled
                      name="number"
                      placeholder="10-digit number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-2">
                Your Gender{" "}
                <button className="ms-4 text-primary px-2 rounded-5">
                  Edit
                </button>
              </p>
              <span className="pe-4">
                <input
                  className="me-2"
                  type="radio"
                  name="gender"
                  id="genderMale"
                />
                <label htmlFor="genderMale">Male</label>
              </span>
              <span>
                <input
                  className="me-2"
                  type="radio"
                  name="gender"
                  id="genderMale"
                />
                <label htmlFor="genderMale">Male</label>
              </span>
            </div>
            <div className="mb-3">
              <h6 className="mb-2">
                Email Address{" "}
                <button className="ms-4 text-primary px-2 rounded-5">
                  Edit
                </button>
              </h6>
              <input
                type="email"
                disabled
                className="form-control"
                value={"john@gmail.com"}
              />
            </div>
            <div className="form-group col-12">
              <p className="col-sm-offset-2 col-sm-10 help-block">address</p>
              <textarea
                name="message"
                id=""
                rows="5"
                className="col-12"
                placeholder="Street address, P.O. box, company name, c/o Apartment, suite , unit, building, floor, etc."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="selectCountry" className="col-sm-2 control-label">
                Country
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="selectCountry"
                  name="country"
                >
                  <option value="" selected="selected">
                    (please select a country)
                  </option>
                  <option value="AF">Afghanistan</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                </select>
              </div>
            </div>
          </div>
          {/* manage address */}
          {/* <AddressForm /> */}
        </div>
        <div className="text-start">
          <div className="px-3 py-3 d-flex gap-2 align-items-end justify-content-start">
            <ImUser className="text-primary fs-4" />
            <h6 className="fw-semibold text-uppercase m-0">Account Settings</h6>
          </div>

          <div role="button" className="w-100 account active border-0">
            <p className=" ps-5 py-2 border-0">Profile Information</p>
          </div>
          <div role="button" className="w-100 account">
            <p className=" ps-5  py-2 border-0  ">PAN Card info</p>
          </div>
          <div role="button" className="w-100 account">
            <p className=" ps-5  py-2 border-0  ">Manage Address</p>
          </div>
          <div role="button" className="w-100 account">
            <p className=" ps-5  py-2 border-0  ">Gift cards</p>
          </div>
          <Link to="/cart">
            <div role="button" className="w-100 account">
              <p className=" ps-5  py-2 border-0  ">My Cart</p>
            </div>
          </Link>
          <Link to="/wishlist">
            <div role="button" className="w-100 account">
              <p className=" ps-5  py-2 border-0  ">My wishList</p>
            </div>
          </Link>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    logOut();
                    clearCart();
                    toast.success("Logout Success");
                  })
                  .catch((error) => {
                    toast.success("An error happened");
                    // An error happened.
                  });
              }}
              className="px-3 py-2 d-flex gap-2 align-items-center justify-content-center btn my-3"
            >
              <SlLogout className="text-primary fs-4" />
              <h6 className="fw-semibold text-uppercase m-0">Logout</h6>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;

  .account:hover,
  button:hover,
  .active {
    background-color: #1e8fff2e;
    color: #1569bd;
  }
  .section-center {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 75px 1fr;

    gap: 1.5rem;
    > div {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 3px;
      border-radius: 2px;
    }
    > div:nth-child(2) {
      grid-column: 2/3;
      grid-row: 1/3;
    }
    img {
      width: 50px;
    }
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

/*<div className="section-center d-grid">
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
                      clearCart();
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
      </div> */
