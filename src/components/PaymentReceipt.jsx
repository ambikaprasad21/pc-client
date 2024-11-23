import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Row from "../ui/Row";

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 8rem;
  border: 5px solid #4c81d7;
  border-radius: 9px;
  width: 50rem;
  margin: 5rem auto;
  font-size: 2rem;
`;

function PaymentReceipt() {
  const searchParam = useSearchParams()[0];
  const paymentId = searchParam.get("p_id");
  const ptype = searchParam.get("p_type");
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Payment receipt</h1>
      <StyledCard>
        <Row>
          <div>
            Name: <span>{localStorage.getItem("name")}</span>
          </div>
          <div>
            Email: <span>{localStorage.getItem("email")}</span>
          </div>
          <div>
            Plan type: <span>{ptype}</span>
          </div>
          <div>
            Payment ID: <span>{paymentId}</span>
          </div>
        </Row>
      </StyledCard>
    </>
  );
}

export default PaymentReceipt;
