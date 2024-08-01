import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import styled from "styled-components";
import Button from "./../ui/Button";
import { PAGE_SIZE } from "../utility/constant";
import { useSearchParams } from "react-router-dom";

const StyledDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5rem;

  p {
    font-size: 1.2rem;
    font-weight: 550;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function previouPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;
  return (
    <StyledDiv>
      <p>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of
        <span> {count}</span> members
      </p>

      <Buttons>
        <Button
          variation="secondary"
          size="small"
          onClick={previouPage}
          disabled={currentPage === 1}
        >
          <StyledButton>
            <FaAngleDoubleLeft />
            <span>Previous</span>
          </StyledButton>
        </Button>
        <Button
          variation="secondary"
          size="small"
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <StyledButton>
            <span>Next</span>
            <FaAngleDoubleRight />
          </StyledButton>
        </Button>
      </Buttons>
    </StyledDiv>
  );
}

export default Pagination;
