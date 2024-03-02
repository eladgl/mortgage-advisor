import React from "react";
import { Link } from "react-router-dom";
import DropDown from "./dropDown";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { linksConfig } from "../pages/config/linksConfig";
const TopNavBar = () => {
  const user = {};
  const registeredDropDownLinks = linksConfig.map((link) => ({
    name: link.title,
    path: link.path,
  }));

  const unRegisteredDropDownLinks = [
    { name: "Register", path: "/registration" },
  ];

  return (
    <nav className="bg-blue-400  fixed top-0 w-full">
      <div className="flex justify-between items-center sm:px-4 py-3 md:px-10 md:py-5">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-gray-200 hover:animate-pulse hover:bg-gray-700 hover:text-white sm:px-3 rounded-md text-sm font-medium scale-50 sm:scale-100"
          >
            <FaHome size={48} />
          </Link>
        </div>
        <div className="flex">
          {user ? (
            <DropDown dropDownLinks={registeredDropDownLinks} user={user} />
          ) : (
            <DropDown dropDownLinks={unRegisteredDropDownLinks} user={user} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;