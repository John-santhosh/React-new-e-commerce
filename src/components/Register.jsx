import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import regImage from "../assets/registerimg.avif";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../config/Config";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { userLogged, current_user } = useUserContext();
  const { googleSignUp } = useUserContext();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const navigate = useNavigate();

  // sign in with userName
  const registerNewUser = (e) => {
    e.preventDefault();
    let Email = email.current.value;
    let passwd = password.current.value;
    let Name = name.current.value;
    createUserWithEmailAndPassword(auth, Email, passwd)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Register successful");
        updateProfile(auth.currentUser, {
          displayName: Name,
        });
        signOut(auth);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper className="py-5 ">
      <div className="signup-form section-center  p-2">
        <img src={regImage} alt="" />
        <div className="form">
          <h2 className="text-dark mb-4 text-center">New User Register</h2>

          <form onSubmit={registerNewUser}>
            <div>
              <label htmlFor="">Name</label>
              <input
                className="form-control mt-2"
                type="text"
                placeholder="Full Name"
                name="name"
                required
                ref={name}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="">Email</label>
              <input
                ref={email}
                className="form-control mt-2"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
            </div>
            <div className="my-3">
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
                <button className="btn btn-solid btn-100" type="submit">
                  Signed in as {current_user}
                </button>
                <p className="mt-3 text-decoration-underline fw-semibold">
                  <Link to="/myaccount ">Logout?</Link>
                </p>
              </>
            ) : (
              <>
                <p className="my-4 text-secondary">
                  <Link
                    to="/login"
                    className=" text-dark text-decoration-underline fw-semibold"
                  >
                    Already have an account?
                  </Link>{" "}
                </p>
                <button className="btn btn-solid btn-100" type="submit">
                  Register
                </button>
                <button
                  onClick={googleSignUp}
                  type="button"
                  className="btn my-4 btn-100"
                >
                  <FcGoogle className="me-2 fs-2" /> Register With with Google
                </button>
                <p className="mt-3">
                  <span className="fw-semibold ">
                    For Testing:{" "}
                    <Link
                      to="/login"
                      className="text-decoration-underline text-primary"
                    >
                      (ClickHere)
                    </Link>
                  </span>{" "}
                </p>
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
export default Register;
