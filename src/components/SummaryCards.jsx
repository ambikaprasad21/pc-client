import styled, { css } from "styled-components";

const Container = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1.2rem 3rem;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.4rem;
  border-radius: 999px;

  ${(props) => css`
    background-color: #${props.bg};
  `}
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledNumber = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
`;

const StyledText = styled.div`
  font-size: 2rem;
  color: #646464;
`;
function SummaryCards({ Icon, svgc, svgbgc, number, children }) {
  return (
    <Container>
      <StyledIcon bg={svgbgc}>
        <Icon color={svgc} size="2rem" />
      </StyledIcon>
      <Text>
        <StyledNumber>{number}</StyledNumber>
        <StyledText>{children}</StyledText>
      </Text>
    </Container>
  );
}

export default SummaryCards;
