import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.svg";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../Context";
const Navbar = () => {
  const { state, closeSidebar, openSidebar } = useGlobalContext();
  const isSideBarOpen = state.isSideBarOpen;
  return (
    <Wrapper className="d-grid">
      <div className={isSideBarOpen ? "sidebar sidebar_open" : "sidebar"}>
        <div>
          <div>
            <div className="logo d-flex align-items-center ">
              <img src={logo} alt="logo" />

              <button className="d-block d-lg-none">
                <FaTimes onClick={closeSidebar} />
              </button>
            </div>

            <ol>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">about</NavLink>
              </li>
              <li className="">
                <NavLink to="/products">products</NavLink>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="section-center d-flex align-items-center ">
        <div className="logo d-flex align-items-center ">
          <img src={logo} alt="logo" />

          <button className="d-block d-lg-none">
            <HiMenu onClick={openSidebar} />
          </button>
        </div>
        <ol className="d-flex d-none d-lg-flex">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">about</NavLink>
          </li>
          <li className="">
            <NavLink to="/products">products</NavLink>
          </li>
        </ol>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--clr-p-11);
  height: 4rem;
  place-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  > div.section-center {
    justify-content: space-between;
  }
  .logo {
    justify-content: space-between;
    /* width: 100%; */
    img {
      width: 200px;
    }
    svg {
      font-size: 2rem;
      /* display: none; */
    }
  }
  ol {
    list-style: none;
    margin: 0;
  }
  @media only screen and (max-width: 992px) {
    div.section-center {
      justify-content: center;
    }
    .logo {
      width: 100%;
    }
  }
  /* sidebar */

  .sidebar {
    /* display: none; */
    /* z-index: -99; */
    top: 0;
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #00000057;
    opacity: 0;
    transition: var(--transition);
    transform: translateX(-100%);
    > div {
      transition: all 0.1s;
      background-color: #fff;
      padding: 1rem;
      max-width: 400px;
      height: 100vh;
    }
    > div.sidebar_open {
    }
    @media only screen and (max-width: 600px) {
      > div {
        max-width: 100%;
        /* background-color: red; */
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
    /* z-index: 99; */
    opacity: 1;
    transform: translateX(0);
    > div {
    }
  }
  .sidebar.sidebar_open {
  }
`;
export default Navbar;
