import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/Context";
import logo from "../assets/logo.svg";
import styled from "styled-components";
const Sidebar = () => {
  const { state, closeSidebar } = useGlobalContext();
  const isSideBarOpen = state.isSideBarOpen;
  return (
    <div className={isSideBarOpen ? "sidebar sidebar_open" : "sidebar"}>
      <Wrapper>
        <div className="logo d-flex align-items-center mb-4">
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
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="">
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="">
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ol>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  li {
    margin: 1rem auto;
    text-align: center;
    transition: var(--transition);
    :hover {
      transform: scale(1.1);
    }
  }
`;
export default Sidebar;
