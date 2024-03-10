import styled from 'styled-components';

export const LeftArrow = styled.div`
    margin-top: 5rem;
    background-color: blue;
    width: 100%;
    height: 80px;
    clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0 47%);

    @media screen and (max-width: 768px) {
        clip-path: polygon(25% 0%, 25% 20%, 100% 20%, 100% 80%, 25% 80%, 25% 100%, 0 47%);
    }
`;
