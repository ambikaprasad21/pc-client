import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: ${props.gap};
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
      gap: ${props.gap};
    `}
`;

Row.defaultProps = {
  type: "vertical",
  gap: "1.2rem",
};

export default Row;
