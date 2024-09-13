import styled from "styled-components";

export const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 2px solid #e3e7eb;
  background-color: #f8f9fa;
  color: black;
  /* box-shadow: var(--shadow-sm); */
  width: 100%;
  height: 8rem;

  &:focus {
    outline: 2px solid #afcbe8;
    color: #636363;
  }
`;
