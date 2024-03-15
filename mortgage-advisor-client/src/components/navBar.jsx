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
  //width: 400px;
`;

const NavigationButton = styled.label`
  background-color: #04aaaa;
  height: 7rem;
  width: 7rem;
  position: fixed;
  top: 8rem;
  right: 6rem;
  border-radius: 50%;
  z-index: 2000;
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
   margin-top: 3.5rem;

   &, &::before, &::after {
    content: "";
    width: 3rem;
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
  /* position: fixed;
  top: 8.5rem;
  right: 6.5rem; */
  background-image: radial-gradient(#041af2, #041a32);
  z-index: 1000;
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
`;

const NavigationCheckbox = styled.input`
  display: none;

  &:checked ~ .navigation__background {
    transform: scale(80);
  }

  &:checked~.navigation__nav {
  opacity: 1;
  width: 100%;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  width: 100%;
`;

const NavigationNav = styled.nav`
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  opacity: 0;
  width: 0;
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const NavigationItem = styled.li`
  margin: 1rem;
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
  background-size: 50%;
  transition: all .4s;
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
  const user = {};
  const registeredDropDownLinks = linksConfig.map((link) => ({
    name: link.title,
    path: link.path,
  }));

  const unRegisteredDropDownLinks = [
    { name: "Register", path: "/registration" },
  ];
  const location = useLocation();

  // const renderLinks = () => {
  //   return linksConfig.map((link) => (
  //     <LinkContainer key={link.path}>
  //       <Link
  //         href={link.path}
  //         size={link.size}
  //         bold={location.pathname === link.path || location.pathname === link.secondaryPath}
  //         padding={link.padding}
  //         value={link.title}
  //         component={link.component}
  //       />
  //       {link.icon && <SvgIcon name={access.icon(`icons.${link.icon}`)} />}
  //     </LinkContainer>
  //   ));
  // };

  const renderLi = (links) => {
    console.log(links);
    return links.map((link, index) => {
      return (
        <NavigationItem className="navigation__item">
          <NavigationLink href={link.path} className="navigation__link">
            <span>{` 0${index + 1} `}</span>{link.name}
            </NavigationLink>
          </NavigationItem>
      );
    });
  };

  const renderRightNavBar = () => {
    return (
      <nav className="bg-blue-400  fixed top-0 w-full" style={{ backgroundColor: '#041a32', zIndex: 10000 }}>
        <div className="flex justify-between items-center sm:px-4 py-3 md:px-10 md:py-5">
          <NavigationDiv className="navigation">
            <NavigationCheckbox type="checkbox" className="navigation__checkbox" id="navi-toggle" />

            <NavigationButton className="navigation__button" for="navi-toggle">
              <NavigationIcon className="navigation__icon">&nbsp;</NavigationIcon>
            </NavigationButton>

            <NavigationBackground className="navigation__background">&nbsp;</NavigationBackground>

            <NavigationNav className="navigation__nav">
              <NavigationList className="navigation__list">
                {renderLi(!user.name ? registeredDropDownLinks : unRegisteredDropDownLinks)}
              </NavigationList>
            </NavigationNav>
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
