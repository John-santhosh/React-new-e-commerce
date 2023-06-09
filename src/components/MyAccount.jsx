import styled from "styled-components";

import user from "../assets/userpic.jpg";
import Hero from "./Hero";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/Config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";
import { useProductsProvider } from "../context/ProductsContext";

import { ImUser } from "react-icons/im";
import { SlLogout } from "react-icons/sl";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

const MyAccount = () => {
  const { clearCart } = useCartContext();
  const {
    current_user,
    signOut: logOut,
    userLogged,
    current_user_id,
  } = useUserContext();

  const [editable, setEditable] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    number: null,
    gender: "",
    email: "",
    address: "",
    country: "default",
  });

  // write to firestore
  const postData = async (id, data) => {
    // console.log(data, id);
    try {
      // console.log(data, id);
      await setDoc(doc(db, id, "userInfo"), {
        userInfo: data,
      }).then(() => {
        console.log("success");
        readData(current_user_id);
      });
    } catch (e) {
      console.error("Error adding document: ");
    }
  };

  // reade from firestore
  const readData = async (user) => {
    // console.log(user);
    if (!user) {
      // console.log(null);
      return;
    }

    const docRef = doc(db, user, "userInfo");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDetails(docSnap.data().userInfo);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    readData(current_user_id);
  }, [current_user_id]);

  if (!userLogged) {
    return (
      <Wrapper className="section-center d-grid align-items-center justify-content-center">
        <div className="text-center">
          <h4>Please Login to continue</h4>
          <Link to="/login" className="btn btn-solid py-1 px-4 mt-3">
            Login
          </Link>
        </div>
      </Wrapper>
    );
  }
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
              <strong>{details.name}</strong>
            </p>
          </div>
        </div>
        <div className="p-3 my-md-0 my-3">
          <div className="">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postData(current_user_id, details);
              }}
            >
              <div className="mt-4 mb-3">
                <h6 className="mb-2">
                  Personal Information
                  <button
                    className="ms-4 text-primary px-2 rounded-5"
                    onClick={() => setEditable(!editable)}
                    type="button"
                  >
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
                        disabled={editable}
                        value={details.name}
                        onChange={(e) =>
                          setDetails({ ...details, name: e.target.value })
                        }
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="inputFullName"
                        value={details.number || ""}
                        onChange={(e) =>
                          setDetails({ ...details, number: e.target.value })
                        }
                        disabled={editable}
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
                  {/* <button className="ms-4 text-primary px-2 rounded-5">
                  Edit
                </button> */}
                </p>
                <span className="pe-4">
                  <input
                    className="me-2"
                    type="radio"
                    name="gender"
                    id="genderMale"
                    value="male"
                    checked={details.gender === "male"}
                    onChange={(e) =>
                      setDetails({ ...details, gender: e.target.value })
                    }
                  />
                  <label htmlFor="genderMale">Male</label>
                </span>
                <span>
                  <input
                    className="me-2"
                    type="radio"
                    name="gender"
                    id="genderFemale"
                    value="female"
                    checked={details.gender === "female"}
                    onChange={(e) =>
                      setDetails({ ...details, gender: e.target.value })
                    }
                  />
                  <label htmlFor="genderMale">FeMale</label>
                </span>
              </div>
              <div className="mb-3">
                <h6 className="mb-2">
                  Email Address{" "}
                  {/* <button className="ms-4 text-primary px-2 rounded-5">
                  Edit
                </button> */}
                </h6>
                <input
                  type="email"
                  disabled
                  value={details.email}
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group col-12">
                <p className="col-sm-offset-2 col-sm-10 help-block">address</p>
                <textarea
                  name="message"
                  id=""
                  rows="5"
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                  className="col-12 p-2"
                  placeholder="Apartment,  Street address, P.O. box,building, floor, etc."
                ></textarea>
              </div>
              <div className="form-group">
                <label
                  htmlFor="selectCountry"
                  className="col-sm-2 control-label"
                >
                  Country
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    id="selectCountry"
                    name="country"
                    defaultValue={details.country}
                    onChange={(e) =>
                      setDetails({ ...details, country: e.target.value })
                    }
                  >
                    <option value="default">(please select a country)</option>
                    <option value="tn">TamilNadu</option>
                    <option value="kl">Kerala</option>
                    <option value="ap">Andhra</option>
                  </select>
                </div>
              </div>
              <button
                className="btn btn-solid py-1 px-5 rounded-5 mt-3"
                onClick={() => {}}
              >
                Confirm and update details
              </button>
            </form>
          </div>
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
