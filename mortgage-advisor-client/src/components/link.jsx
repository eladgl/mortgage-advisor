import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as access from "@access";
import { Link as RouterLink } from "react-router-dom";

export const TailWindLink = styled.a`
  font-weight: 500;
  color: #2563eb;
  
  &:hover {
      text-decoration: underline;
  }

  .dark {
    color: #3b82f6; 
  }
`;

export const MainLink = styled(TailWindLink)`
  color: #fff
`

const StyledLink = styled(RouterLink)`
  font-size: ${(props) => `${props.size}rem`};
  font-weight: ${(props) => (props.bold ? 800 : 100)};
  text-decoration: none;
  color: ${() => access.color("colors.blue05")};
  padding-right: ${(props) => `${props.padding}rem`};
  border-bottom: 1px solid gray;

  &:hover,
  &:focus,
  &:active,
  &:visited,
  &:link {
    text-decoration: none;
    color: ${() => access.color("colors.white")};
  }
`;

const Link = ({ href, value, handleClick, size, padding, bold  }) => {
  return (
    <StyledLink
      to={href}
      onClick={handleClick}
      size={size}
      padding={padding}
      bold={bold}
    >
      {value}
    </StyledLink>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  padding: PropTypes.number,
  size: PropTypes.number,
  value: PropTypes.string,
  bold: PropTypes.bool,
  handleClick: PropTypes.func,
};

Link.defaultProps = {
  href: "#",
  handleClick: () => null,
  value: "",
  bold: false,
};

export default Link;
