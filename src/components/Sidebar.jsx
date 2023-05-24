import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../Context";
import logo from "../assets/logo.svg";
const Sidebar = () => {
  const { state, closeSidebar } = useGlobalContext();
  const isSideBarOpen = state.isSideBarOpen;
  return (
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
            <li>Pages </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
