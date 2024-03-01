import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const SvgWrapper = styled.svg`
    padding-right: 0.4;
    width: ${(props) => `${props.size}rem`};
    height: ${(props) => `${props.size}rem`};
`;

const SvgIcon = ({ name, prefix, color, size, ...props }) => {
    const symbolId = `#${name}`;
  
    return (
      <SvgWrapper {...props} aria-hidden="false" size={size}>
        <use href={symbolId} fill={color} />
      </SvgWrapper>
    );
};

SvgIcon.propTypes = {
    name: PropTypes.string,
    prefix: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
};

SvgIcon.defaultProps = {
    prefix: '',
    size: '1.3',
    color: "#000",
};

export default SvgIcon;
