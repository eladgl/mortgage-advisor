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

const NavBar = () => {
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

  return <RightPane>{renderLinks()}</RightPane>;
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
