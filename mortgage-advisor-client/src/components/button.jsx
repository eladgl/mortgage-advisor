import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  color: #ffffff;
  background-color: #2563eb;
  font-weight: 500;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  text-align: center;
  outline: none;
  border: none;  

  &:hover,
  &:focus {
    background-color: #3b82f6;
  }

  .dark {
  background-color: #374151;
    }

.dark &:hover,
.dark &:focus {
  background-color: #4b5563;
}

`;