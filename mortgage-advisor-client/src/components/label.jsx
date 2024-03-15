import styled from 'styled-components';

export const Label = styled.label`
  position: relative;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;

  .dark & {
    color: #ffffff;
  }
`;

export const ImportantLabel = styled(Label)`
   &::before {
    content: '*';
    top: 0;
    right: -10px;
    color: red;

    .dark {
      color: yellow;
    }
  }  
`;