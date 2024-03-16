import styled from 'styled-components';

export const Input = styled.input`
 background-color: #f9fafb;
  border: 1px solid #d1d5db;
  color: #1f2937;
  border-radius: 0.375rem;
  padding: 0.625rem;
  display: block;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #2563eb;

    .dark & {
      border-color: #3b82f6;
    }
  }

  .dark & {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;