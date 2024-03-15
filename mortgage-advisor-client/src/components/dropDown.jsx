import { useState, useRef } from "react";
import {
  GoTriangleDown,
  GoTriangleRight,
  GoTriangleLeft,
} from "react-icons/go";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DropDown = ({ dropDownLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const { isAuthenticated, logout } = useAuth();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.addEventListener("click", handleClickOutsideMenu);
    } else {
      document.removeEventListener("click", handleClickOutsideMenu);
    }
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
      document.removeEventListener("click", handleClickOutsideMenu);
    }
  };

  const handleLogOut = async (navigate) => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left mx-auto mt-2 md:ml-8">
      <div
        ref={menuRef}
        className={` md:w-auto transition-width duration-1000 ease-in-out ${
          isOpen ? "w-[48vw]" : "w-14"
        }`}
      >
        <button
          className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-bg-navbar-custom text-sm font-medium text-gray-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleToggleMenu}
        >
          <span className={"hidden md:block"}>תפריט</span>
          <GoTriangleDown size={24} className="hidden md:block md:ml-4 mt-1" />
          <GoTriangleLeft
            size={24}
            className={isOpen ? "md:hidden " : "hidden"}
          />
          <GoTriangleRight
            size={24}
            className={!isOpen ? "md:hidden " : "hidden"}
          />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 h-screen md:h-fit w-screen  md:w-full rounded-md shadow-lg bg-bg-navbar-custom ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform duration-300 ease-in-out md:translate-x-0">
          <div
            className="text-center"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dropDownLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className=" block px-4 py-4 md:py-2 text-lg md:text-sm text-gray-50 hover:bg-gray-50 hover:text-black border-b-2 border-gray-500"
                role="menuitem"
                style={{
                  textAlign: "right",
                  backgroundColor: "#041a32",
                  color: "#fff",
                  zIndex: 900000,
                }}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                className=" hover:bg-red-400 hover:text-black block px-4 py-4 md:py-2 text-lg md:text-sm text-gray-50  border-b-2 border-gray-500 bg-gray-900 w-full"
                onClick={() => {
                  handleLogOut(navigate);
                }}
                style={{
                  textAlign: "right",
                }}
              >
                התנתקות
              </button>
            ) : (
              <Link
                key={"loginBtn"}
                to="/login"
                className=" hover:bg-green-400 hover:text-black block px-4 py-4 md:py-2 text-lg md:text-sm text-gray-50  border-b-2 border-gray-500 bg-gray-900 w-full"
                role="menuitem"
                style={{ textAlign: "right" }}
              >
                התחברות
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
