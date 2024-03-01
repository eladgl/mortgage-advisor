import React from "react";
import PropTypes from 'prop-types';
import { Routes } from "react-router-dom";
import styled from "styled-components";
import Link from "./link";
import { linksConfig } from  "/src/pages/config/linksConfig";
import * as access from "@access";

const RightPane = styled.div`
    display: flex;
    flex-direction: column;

`;

const LinkContainer = styled.div`
    padding-top: 1.2rem;
`;

const Icon = styled.img`
    width: 10px;  
`;

const NavBar = ({changeComponent}) => {
    //const [Component, setComponent] = useState('HomePage');

    const handleClick = (component) => {
         changeComponent(component);
    }
    const renderLinks = () => {
        return linksConfig.map(link => (
            <LinkContainer key={ link.path }>
                <Link  
                    noProp = {console.log(link.icon)}
                    href={ link.path } 
                    size={ link.size }
                    padding={ link.padding }
                    value={ link.title } 
                    component={ link.component }
                    handleClick={ () => handleClick(link.component) }/>
                {link.icon ?? <Icon src={access.icon(`icons.${link.icon}`)}/>}
            </LinkContainer>
        ));
    };
    return (
        <RightPane>
        { renderLinks() }
        </RightPane>
    )
};

NavBar.propTypes = {
    changeComponent: PropTypes.func,
};

NavBar.defaultProps = {
    changeComponent: () => null,
}

export default NavBar;