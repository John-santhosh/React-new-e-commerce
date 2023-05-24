import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Sidebar from "./sidebar";

import { HiMenu } from "react-icons/hi";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { TbUserCircle } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useGlobalContext } from "../Context";

const Navbar = () => {
  const { openSidebar } = useGlobalContext();
  return (
    <Wrapper className="d-grid">
      <Sidebar></Sidebar>
      <div className="section-center d-flex align-items-center ">
        <div className="logo  ">
          <img src={logo} alt="logo" />
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
          <li
            className="search"
            onClick={(e) => {
              // console.log(e.target);
              if (e.target.placeholder) {
                console.log(true);
                return;
              }
              e.currentTarget.querySelector("div").classList.toggle("show");
            }}
          >
            <button>
              <AiOutlineSearch />
            </button>
            <div className="">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <button className="btn btn-solid">
                  <AiOutlineSearch />
                </button>
              </InputGroup>
            </div>
          </li>
          <li
            className="user"
            onClick={(e) => {
              e.currentTarget.querySelector("div").classList.toggle("show");
            }}
          >
            <button>
              <TbUserCircle />
            </button>
            <div>
              <p>Login</p>
              <p>Register</p>
            </div>
          </li>
          <li>
            <button>
              <AiOutlineHeart />
              <span>{1}</span>
            </button>
          </li>
          <li>
            <button>
              <CgShoppingBag />
              <span>{1}</span>
            </button>
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
  z-index: 9999;
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
      display: block;
    }
  }
  /* sidebar */

  .sidebar {
    display: none;
    z-index: -99;
    top: 0;
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #00000057;
    opacity: 0;
    transition: var(--transition);
    overflow: hidden;
    > div {
      transform: translateX(100%);
      transition: var(--transition);
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
          bottom: 1.1rem;
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

    li.user {
      position: relative;
      div {
        position: absolute;
        left: 20%;
        font-size: 1rem;
        background-color: #ffffff;
        width: 120px;
        height: 0;
        overflow: hidden;
        transition: var(--transition);
        border: 0px solid transparent;

        p {
          padding: 0.5rem 1rem;
          margin: 0;
        }
      }
      div.show {
        border: 1px solid var(--clr-p-1);
        height: 90px;
      }
    }
    svg {
      transition: var(--transition);
    }
    li svg:hover {
      filter: drop-shadow(0 0 10px var(--clr-p-1));
    }

    li.search {
      position: relative;

      > div {
        width: 250px;
        position: absolute;
        right: 0;
        height: 0;
        overflow: hidden;
        transition: var(--transition);
      }
      div.show {
        height: 50px;
        overflow: visible;
      }
    }
  }
`;
export default Navbar;
