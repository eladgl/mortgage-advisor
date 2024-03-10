import styled from 'styled-components';

export const LeftArrow = styled.div`
    margin-top: 5rem;
    background-color: blue;
    width: 100%;
    height: 80px;
    clip-path: polygon(20% 0%, 20% 30%, 100% 30%, 100% 70%, 20% 70%, 20% 100%, 0 50%);

    @media screen and (max-width: 768px) {
        clip-path: polygon(25% 0%, 25% 20%, 100% 20%, 100% 80%, 25% 80%, 25% 100%, 0 47%);
    }
`;
