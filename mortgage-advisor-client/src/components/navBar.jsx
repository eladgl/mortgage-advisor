import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Link from "./link";
import { linksConfig } from "../pages/config/linksConfig";
import * as access from "@access";
import * as types from "../pages/constants/pagesTypes";
import { useLocation } from "react-router-dom";

import SvgIcon from "./svgIcon";

const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid black;
  height: 100%;
  justify-content: top;
  width: 400px;
`;

const LinkContainer = styled.div`
  padding-top: 1.2rem;
  display: flex;
  flex-direction: row;
`;

const NavigationDiv = styled.div`
  overflow: hidden;
`;

const NavBar = () => {
  const user = {};
  const registeredDropDownLinks = linksConfig.map((link) => ({
    name: link.title,
    path: link.path,
  }));

  const unRegisteredDropDownLinks = [
    { name: "Register", path: "/registration" },
  ];
  const location = useLocation();

  const renderLinks = () => {
    return linksConfig.map((link) => (
      <LinkContainer key={link.path}>
        <Link
          href={link.path}
          size={link.size}
          bold={location.pathname === link.path || location.pathname === link.secondaryPath}
          padding={link.padding}
          value={link.title}
          component={link.component}
        />
        {link.icon && <SvgIcon name={access.icon(`icons.${link.icon}`)} />}
      </LinkContainer>
    ));
  };

  const renderLi = (links) => {
    console.log(links);
    return links.map( (link, index) =>{
      return <li className="navigation__item"><a href={link.path} className="navigation__link"><span>{` 0${index+1} `}</span>{link.name}</a></li>
    });
  };

  const renderRightNavBar = () => {
    return (
      <nav className="bg-blue-400  fixed top-0 w-full" style={{ backgroundColor: '#041a32', zIndex: 10000}}>
        <div className="flex justify-between items-center sm:px-4 py-3 md:px-10 md:py-5">
      <NavigationDiv className="navigation">
        <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />
  
        <label for="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>
  
        <div className="navigation__background">&nbsp;</div>
  
        <nav className="navigation__nav">
          <ul className="navigation__list">
            {renderLi(!user.name ? registeredDropDownLinks : unRegisteredDropDownLinks)}
          </ul>
        </nav>
      </NavigationDiv>
      </div>
      </nav>
    )
  }

  return <RightPane>{renderRightNavBar()}</RightPane>;
};

NavBar.propTypes = {
  changeComponent: PropTypes.func,
  currentPage: PropTypes.string,
};

NavBar.defaultProps = {
  changeComponent: () => null,
  currentPage: types.HOMEPAGE,
};

export default NavBar;
