import React from "react";
import PropTypes from 'prop-types';
import { Routes } from "react-router-dom";
import styled from "styled-components";
import Link from "./link";
import { linksConfig } from  "../pages/config/linksConfig";
import * as access from "@access";
import * as types from '../pages/constants/pagesTypes';

import SvgIcon from "./svgIcon";

const RightPane = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    border-left: 1px solid black;
    height: 70%;
    justify-content: top;
    margin-top: 3%;
`;

const LinkContainer = styled.div`
    padding-top: 1.2rem;
`;

const HomeBtn = styled.div`
    padding: .5rem 3rem 0rem .5rem;
    width: fit-content;
    cursor: pointer;

    &:active {
        transform: translateX(-1px) translateY(1px);
    }
`;

const NavBar = ({changeComponent, currentPage}) => {

    const handleClick = (componentType) => {
         changeComponent(componentType);
    };

    const homeBtnClick = () => {
        changeComponent(types.HOMEPAGE);
    };

    const renderLinks = () => {

        return linksConfig.map(link => (
            
            <LinkContainer key={ link.path }>
                <Link href={ link.path } 
                      size={ link.size }
                      bold = { link.component === currentPage }
                      padding={ link.padding }
                      value={ link.title } 
                      component={ link.component }
                      handleClick={ () => handleClick(link.component) }/>
                {link.icon && <SvgIcon name={ access.icon(`icons.${link.icon}`) }/>}
            </LinkContainer>
        ));
    };

    return (
        <RightPane>
            <HomeBtn onClick={ homeBtnClick }>
                <SvgIcon name={ access.icon('icons.home') } size="4"/>
            </HomeBtn>
            { renderLinks() }
        </RightPane>
    );
};

NavBar.propTypes = {
    changeComponent: PropTypes.func,
    currentPage: PropTypes.string,
};

NavBar.defaultProps = {
    changeComponent: () => null,
    currentPage: types.HOMEPAGE,
}

export default NavBar;