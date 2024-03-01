import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as access from "@access";

import SvgIcon from "./svgIcon";

const Card = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 130px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 3rem 0 0 2rem;
`;

const UserLabel = styled.p`
    
`

const UserCard = ({ username, userImage }) => {
    const renderImage = () => (
        userImage === '#' ? <SvgIcon size={ 1.5 } name={ access.icon('icons.anonymousUser') }/> :
        <img src={ userImage } alt="userImage"></img>
    );

    return (
        <Card>
            <UserLabel>{username}</UserLabel>
            {renderImage()}
        </Card>
    );
};

UserCard.propTypes = {
    username: PropTypes.string,
    userImage: PropTypes.string,
};

UserCard.defaultProps = {
    username: "משתמש אנונימי",
    userImage: '#',
};

export default UserCard;