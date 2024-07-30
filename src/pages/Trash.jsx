import styled from "styled-components";
import Row from "../ui/Row";

import { MdRestore, MdDelete } from "react-icons/md";

const trashData = [
  {
    id: 1,
    title: "Fullstack website",
  },
  {
    id: 2,
    title: "Fullstack website",
  },
];

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  align-items: center;
  column-gap: 2rem;
  padding: 1rem 1.6rem;
  background-color: #95b4eb33;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  div {
    font-weight: 600;
    font-size: 1.6rem;
  }
`;

const TableData = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  align-items: center;
  column-gap: 2rem;
  padding: 1rem 1.6rem;
  &:not(:last-child) {
    border-bottom: 1px solid #e8e8e89a;
  }

  div {
    font-size: 1.6rem;
  }
`;

const ResDel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 2rem;
  }
`;

function Trash() {
  return (
    <Row>
      <Heading>All Your Trashed Projects</Heading>
      <div>
        <TableHead>
          <div>Project title</div>
          <ResDel>
            <div></div>
            <div></div>
          </ResDel>
        </TableHead>
        {trashData.map((el) => (
          <TableData key={el.id}>
            <div>{el.title}</div>
            <ResDel>
              <MdRestore color="005ee3" />

              <MdDelete color="F8202D" />
            </ResDel>
          </TableData>
        ))}
      </div>
    </Row>
  );
}

export default Trash;
