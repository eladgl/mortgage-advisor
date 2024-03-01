import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import * as access from "@access";

const StyledLink = styled.a`
    font-size: ${(props) => `${props.size}rem` };
    font-weight: ${(props) => props.bold ? 700 : 200};
    text-decoration: none;
    color: ${() => access.color('colors.blue05')};
    padding-right: ${(props) => `${props.padding}rem` };

    &:hover, &:focus, &:active, &:visited, &:link {
        text-decoration: none;
        color: ${() => access.color('colors.blue05')};
    }
`;

const Link = ({ href, value, handleClick, size, padding, bold }) => {
    return (
        <StyledLink href= { "#" } onClick={ handleClick } size={ size } padding={ padding } bold={ bold }>
            { value }
        </StyledLink>
    )
} 

Link.propTypes = {
    href: PropTypes.string,
    padding: PropTypes.number,
    size: PropTypes.number,
    value: PropTypes.string,
    handleClick: PropTypes.func,
};

export default Link;