import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Sidebar from "./Sidebar";

import { HiMenu } from "react-icons/hi";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { TbUserCircle } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useGlobalContext } from "../context/Context";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useProductsProvider } from "../context/ProductsContext";

const Navbar = () => {
  const { total_Amount } = useCartContext();
  const { openSidebar } = useGlobalContext();
  const { userLogged } = useUserContext();
  const { wishlisted } = useProductsProvider();
  return (
    <Wrapper className="d-grid">
      <Sidebar></Sidebar>
      <div className="section-center d-flex align-items-center ">
        <div className="logo  ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ol className="nav-links d-flex d-none d-lg-flex">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">about</NavLink>
          </li>
          <li className="">
            <NavLink to="/products">products</NavLink>
          </li>
          <li>
            Pages <FaChevronDown />
          </li>
        </ol>

        {/* user */}
        <ol className="user_details d-flex">
          <li className="search">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Body>
                    <InputGroup className="">
                      <Form.Control
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <button className="btn btn-solid">
                        <AiOutlineSearch />
                      </button>
                    </InputGroup>
                  </Popover.Body>
                </Popover>
              }
            >
              <a>
                <AiOutlineSearch />
              </a>
            </OverlayTrigger>
          </li>
          <li
            className="user"
            // onClick={(e) => {
            //   const length = e.currentTarget.querySelectorAll("div > a").length;

            //   // height of a inner elements
            //   const height =
            //     e.currentTarget.querySelector("div>a").getBoundingClientRect()
            //       .height * length;

            //   const divElement = e.currentTarget.querySelector("div");

            //   // setting height
            //   divElement.style.height = `${height}px`;
            //   e.currentTarget.querySelector("div").classList.toggle("show");
            // }}
          >
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Body>
                    <div className="fs-6">
                      <Link to="/login">
                        <p>Login</p>
                      </Link>
                      <Link to="/register">
                        <p className="my-2">Register</p>
                      </Link>

                      {userLogged && (
                        <Link to="/myaccount">
                          <p>MyAccount</p>
                        </Link>
                      )}
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <a>
                <TbUserCircle />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <button>
              <Link to="/wishlist">
                <AiOutlineHeart />
                <span>{wishlisted.length}</span>
              </Link>
            </button>
          </li>
          <li>
            <Link to="/cart">
              <button>
                <CgShoppingBag />
                <span>{total_Amount}</span>
              </button>
            </Link>
          </li>
          <li>
            <button className="d-block d-lg-none">
              <HiMenu onClick={openSidebar} />
            </button>
          </li>
        </ol>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--clr-p-11);
  height: 4rem;
  place-items: center;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  > div.section-center {
    justify-content: space-between;
  }
  .logo {
    justify-content: space-between;
    img {
      max-width: 200px;
    }
    svg {
      font-size: 2rem;
    }
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links {
    justify-content: space-around;
    gap: 2rem;
  }
  @media only screen and (max-width: 992px) {
    div.section-center {
      justify-content: center;
    }
    .logo {
      width: 100%;
    }
    div.sidebar {
      /* display: block; */
      /* z-index: -999999; */
      /* visibility: hidden; */
    }
  }
  /* sidebar */

  .sidebar {
    z-index: -99;
    top: 0;
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #00000057;
    opacity: 0;
    transition: var(--transition);
    overflow: hidden;
    transform: translateX(-100%);
    > div {
      transition: var(--transition);
      transform: translateX(100%);
      background-color: #fff;
      padding: 1rem;
      position: absolute;
      top: 0;
      right: 0;
      max-width: 400px;
      width: 400px;
      height: 100vh;
    }
    > div.sidebar_open {
    }
    @media only screen and (max-width: 550px) {
      > div {
        max-width: 100%;
        width: 100%;
      }
    }

    svg {
      color: red;
      transition: var(--transition);

      :hover {
        transform: rotate(180deg);
      }
    }
    img {
      width: 250px;
    }
    ol {
      padding: 0;
    }
  }
  .sidebar_open {
    z-index: 99;
    opacity: 1;
    transform: translateX(0);
    > div {
      transform: translateX(0);
    }
  }
  @media only screen and (max-width: 450px) {
    ol.user_details {
      font-size: 1.3rem;
      gap: 0.5rem;
      li {
        span {
          left: 0.6rem;
          bottom: 1rem;
        }
      }
    }
    .logo img {
      max-width: 150px;
    }
  }
  .user_details {
    font-size: 1.8rem;
    gap: 1rem;

    li {
      transition: var(--transition);
      cursor: pointer;
      position: relative;
      span {
        content: "";
        position: absolute;
        width: 20px;
        background-color: var(--clr-p-2);
        border-radius: 50%;
        bottom: 1.5rem;
        left: 1rem;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    svg {
      transition: var(--transition);
    }
    li svg:hover {
      filter: drop-shadow(0 0 10px var(--clr-p-1));
    }
  }
`;
export default Navbar;
