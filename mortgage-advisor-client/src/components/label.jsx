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

export const ErrorLabel = ({ title, message }) => {
  return (
  <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
    <p className="font-bold">{`שגיאה: ${title}`}</p>
    <p>{ message }</p>
  </div>
  )
}