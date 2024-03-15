import React from "react";
import { Link } from "react-router-dom";
import DropDown from "./dropDown";
import { FaHome } from "react-icons/fa";
import { linksConfig } from "../pages/config/linksConfig";
import { useAuth } from "../context/AuthContext";
const TopNavBar = () => {
  const { isAuthenticated, user  } = useAuth();
  const registeredDropDownLinks = linksConfig.map((link) => ({
    name: link.title,
    path: link.path,
  }));

  const unRegisteredDropDownLinks = [
    { name: "צור קשר", path: "/contactus" },
    { name: "הרשמה", path: "/registration" },
  ];

  return (
    <nav
      className="bg-blue-400  fixed top-0 w-full"
      style={{ backgroundColor: "#041a32", zIndex: 10000 }}
    >
      <div className="flex justify-between items-center sm:px-4 py-3 md:px-10 ">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-gray-200 hover:animate-pulse hover:bg-gray-700 hover:text-white sm:px-3 rounded-md text-sm font-medium scale-50 sm:scale-100"
          >
            <FaHome size={48} />
          </Link>
          {isAuthenticated && user && (
            <span className="ml-2 text-white text-xl font-bold mt-2 mr-4">{`${user.pname || ''} ${user.lname || ''}`}</span> // Adjust this according to how the user name is stored
          )}
        </div>
        <div className="flex">

          {isAuthenticated ? (
            <DropDown dropDownLinks={registeredDropDownLinks} />
          ) : (
            <DropDown dropDownLinks={unRegisteredDropDownLinks} />
          )}
        
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
