import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Link from "./link";
import { linksConfig } from "../pages/config/linksConfig";
import * as access from "@access";
import * as types from "../pages/constants/pagesTypes";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  position: relative;
  height: 100%;
  width: 100%;
`;

const NavigationButton = styled.label`
  background-color: #04aaaa;
  height: 4rem;
  width: 4rem;
  position: fixed;
  top: 8rem;
  right: 3.5rem;
  border-radius: 50%;
  z-index: 2000;
  opacity: .5;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;

  &:hover .navigation__icon::before {
    top: -1rem;
  }

  &:hover .navigation__icon::after {
    top: 1rem;
  }
`;

const NavigationIcon = styled.span`
   position: relative;
   margin-top: 2.0rem;

   &, &::before, &::after {
    content: "";
    width: 2rem;
    height: 2px;
    background-color: #333;
    display: inline-block;
   }

   &::before, &::after {
    content: "";
    position: absolute;
    left: 0;
    top: -.8rem;
    transition: all .2s;
   }

   & span::before{
    top: -1rem;
   }

   & span::after{
    top: 1rem;
   }
`;

const NavigationBackground = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  position: absolute;
  top: -8rem;
  right: 6.5rem; 
  background-image: radial-gradient(#041132, #041a32);
  z-index: 1000;
  transition: transform 1s cubic-bezier(.34,.33,.86,.87);
`;

const NavigationCheckbox = styled.input`
  display: none;

  &:checked ~ .navigation__background {
    height: 150%;
    width: 100%;
    border-radius: 0;
    border: 2px 0px  0px 2px solid black;
    right: 0rem; 
  }

  &:checked~ .navigation__background .navigation__nav {
  opacity: 1;
  width: 100%;
  height: 100%;
  }

  &:checked+.navigation__button .navigation__icon {
    background-color: transparent;
  }

  &:checked+.navigation__button .navigation__icon::before {
    top: 0;
    transform: rotate(135deg);
  }
  &:checked+.navigation__button .navigation__icon::after {
    top: 0;
    transform: rotate(-135deg);
  }
`;

const NavigationList = styled.ul`
  position: relative;
  display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 50%;
`;

const NavigationNav = styled.nav`
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1500;
  opacity: 0;
  width: 0;
  transition: all 0.4 cubic-bezier(.34,.33,.86,.87);
`;

const NavigationItem = styled.li`
  margin: 1rem;
  padding-right: ${(props) => props.paddings}rem;
  font-weight: ${(props) => props.bold === 'true' && 700};
`;

const NavigationLink = styled.a`
  &:link, &:visited {
  display: inline-block;
  font-size: 1rem;
  font-weight: 300;
  padding: 1rem 2rem;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  background-image: linear-gradient(120deg, transparent 0%, transparent 50%, #fff 50%);
  background-size: 230%;
  transition: all .5s;
  }

  &:hover, &:active {
    background-position: 100%;
  color: #55c57a;
  transform: translateX(1rem);
  }

  &:link span, &:visited span {
    margin-right: 1.5rem;
    display: inline-block;
  }
`;


const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const registeredDropDownLinks = linksConfig.map((link) => ({
    name: link.title,
    path: link.path,
    icon: link.icon,
    padding: link.padding,
    bold: location.pathname === link.path || location.pathname === link.secondaryPath,
  }));

  const unRegisteredDropDownLinks = [
    { name: "התחבר", path: "/login" },
    { name: "רישום", path: "/registration" },
  ];

  const renderLi = (links) => {


    return links.map((link, index) => {
      //console.log(link)
      return (
        <NavigationItem key={`${link}-${index}`} className="navigation__item" paddings={link.padding}>
          <NavigationLink href={link.path} className="navigation__link">
            <span> {` `} </span> {link.name}
            {link.icon && <span><SvgIcon name={access.icon(`icons.${link.icon}`)} /></span>}
          </NavigationLink>
        </NavigationItem>
      );
    });
  };

  const renderRightNavBar = () => {
    return (
      <NavigationDiv className="navigation">
        <div>
          <NavigationCheckbox type="checkbox" className="navigation__checkbox" id="navi-toggle" />

          <NavigationButton className="navigation__button" htmlFor="navi-toggle">
            <NavigationIcon className="navigation__icon">&nbsp;</NavigationIcon>
          </NavigationButton>

          <NavigationBackground className="navigation__background">
            <NavigationNav className="navigation__nav">
              <NavigationList className="navigation__list">
                {renderLi(isAuthenticated ? registeredDropDownLinks : unRegisteredDropDownLinks)}
              </NavigationList>
            </NavigationNav>
          </NavigationBackground>
        </div>
      </NavigationDiv>
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
