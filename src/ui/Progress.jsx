import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0df;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledProgress = styled.div`
  height: 4px;
  width: ${(props) => props.width}%;
  background-color: #007aff;
  transition: width 0.5s;
`;

function Progress({ progress }) {
  return (
    <div>
      <ProgressBarContainer>
        <StyledProgress width={progress} />
      </ProgressBarContainer>
    </div>
  );
}

export default Progress;
