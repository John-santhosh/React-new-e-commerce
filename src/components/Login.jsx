import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "../assets/login-form1.avif";
import {
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/Config";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import Hero from "./Hero";

const Login = () => {
  const { createUser, current_user, userLogged, googleSignUp } =
    useUserContext();
  const name = useRef();
  const password = useRef();
  const loginUser = (e) => {
    e.preventDefault();
    let email = name.current.value;
    let passwd = password.current.value;
    signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        const user = userCredential.user.displayName;
        // console.log(userCredential);
        // console.log(current_user);
        createUser(user);
        toast.success("login successful");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  // const sendForgetMail = () => {
  //   let email = name.current.value;
  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       // Password reset email sent!
  //       // ..
  //       toast.success("Serification E-mail Sent");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       toast.error("Try Again Later");
  //       // ..
  //     });
  // };

  return (
    <Wrapper className="py-5 ">
      <div className="signup-form section-center  p-2">
        <img src={image} alt="" />
        <div className="form">
          <h2 className="text-dark">
            Welcome to AIR STORE,
            <br />
            Sign In to continue
          </h2>
          <p className="my-4 text-secondary">
            Don&#39;t have an account?{" "}
            <Link
              to="/register"
              className="text-dark text-decoration-underline fw-semibold"
            >
              Create a account
            </Link>{" "}
            It Takes Less than a minute.
          </p>
          <p className="my-3">
            <span className="fw-semibold ">For Testing: </span> <br /> Email:-
            test@test.com, Password :- 123456
          </p>
          <form onSubmit={loginUser}>
            <div>
              <label htmlFor="">Email</label>
              <input
                ref={name}
                className="form-control mt-2"
                type="email"
                placeholder="Email"
                name="name"
                required
              />
            </div>
            <div className="my-4">
              <label htmlFor="">password</label>
              <input
                required
                ref={password}
                className="form-control mt-2"
                type="password"
                placeholder="password"
                name="pin"
              />
            </div>

            {userLogged ? (
              <>
                <button
                  type="button"
                  className="text-capitalize btn btn-solid btn-100 mb-3"
                >
                  Signed in as{" "}
                  <span className="fw-semibold text-lowercase">
                    {current_user}
                  </span>
                </button>
                <p className="mt-3 text-decoration-underline fw-semibold">
                  <Link to="/myaccount ">Logout?</Link>
                </p>
              </>
            ) : (
              <>
                <p className="text-center my-4 text-decoration-underline">
                  Forget Password ?
                </p>
                <button className="btn btn-solid btn-100" type="submit">
                  Sign In
                </button>
                <button
                  onClick={googleSignUp}
                  type="button"
                  className="btn my-4 btn-100"
                >
                  Sign In with Google
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background-color: var(--clr-p-9);

  .signup-form {
    max-width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--clr-p-11);
    gap: 2rem;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    .signup-form {
      grid-template-columns: unset;
      /* grid-template-rows: 1fr 4fr; */
    }
  }
  @media only screen and (min-width: 1400px) {
    .signup-form {
      max-width: 1200px;
    }
  }
`;
export default Login;
