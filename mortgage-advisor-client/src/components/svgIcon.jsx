import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const SvgWrapper = styled.div`
    position: relative;
    display: inline-block;
    padding-right: 0.4rem;
    width: ${(props) => `${props.size}rem`};
    height: ${(props) => `${props.size}rem`};

    &:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }
`;

const Tooltip = styled.span`
    visibility: hidden;
    width: max-content;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
`;

const SvgIcon = ({ name, prefix, color, size, ...props }) => {
    const symbolId = `#${name}`;
  
    return (
      <SvgWrapper aria-hidden="false" size={size} color={color}>
        <svg width={size + 'rem'} height={size + 'rem'}>
            <use href={symbolId} fill={color} />
        </svg>
        <Tooltip className="tooltip">אומדן בלבד. פרטי ההלואה הסופיים הם הקובעים</Tooltip>
      </SvgWrapper>
    );
};

SvgIcon.propTypes = {
    name: PropTypes.string.isRequired,
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
