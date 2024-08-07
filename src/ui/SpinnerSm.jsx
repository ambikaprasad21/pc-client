import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SpinnerSm() {
  return (
    <LoaderWrapper>
      <Oval
        visible={true}
        height={"auto"}
        color="#FFF"
        ariaLabel="oval-loading"
        wrapperStyle={{ maxWidth: "30%", maxHeight: "30%" }}
        wrapperClass=""
      />
    </LoaderWrapper>
  );
}

export default SpinnerSm;
