import Button from "./../ui/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import memberData from "./../data/memberData";
import Avatar from "./../components/Avatar";
import Row from "./../ui/Row";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../utility/constant";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const AddMember = styled.div`
  align-self: flex-end;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 9px;
  border-bottom: 1.5px solid #dfdfdf;
  /* padding: 0 1.4rem; */

  h2 {
    font-size: 2.4rem;
  }

  div {
    background-color: #f9f9f9;
    border: 1.5px solid #d9d9d9;
    border-radius: 1.8rem;
    padding: 6px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    align-self: center;

    input {
      padding: 0 1.4rem 0;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr 2fr 1.6fr 1fr;
  align-items: center;
  padding: 10px 1.2rem;
  background-color: #f0f5fa;
  border-bottom: 2px solid #d8cfcf;

  div {
    font-size: 1.4rem;
    font-weight: 600;
    color: #828282;
  }
`;

const TableData = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr 2fr 1.6fr 1fr;
  align-items: center;

  div {
    color: #827e7e;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const BottomDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

function Members() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = memberData.length;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const from = (page - 1) * PAGE_SIZE + 1 - 1;
  const to = page === pageCount ? count : page * PAGE_SIZE;

  const [members, setMembers] = useState(memberData.slice(from, to));

  useEffect(() => {
    setMembers(memberData.slice(from, to));
  }, [page]);
  return (
    <StyledDiv>
      <AddMember>
        <Button variation="secondary" size="medium">
          + Add member
        </Button>
      </AddMember>
      <Row gap="3rem">
        <TopDiv>
          <h2>All members</h2>
          <div>
            <input type="text" placeholder="search member..." />
            <AiOutlineSearch
              size={"1.4rem"}
              color="3F8EFC"
              cursor={"pointer"}
              style={{ fontWeight: "bold" }}
            />
          </div>
        </TopDiv>
        <Row gap="2rem">
          <TableHead>
            <div></div>
            <div>Name</div>
            <div>Email Address</div>
            <div>Role</div>
            <div>Action</div>
          </TableHead>
          <Row gap="1.6rem">
            {members.map((member) => (
              <TableData key={member.id}>
                <div>
                  <Avatar
                    src={member.photo}
                    name={member.fullName}
                    size={"medium"}
                  />
                </div>
                <div>{member.fullName}</div>
                <div>{member.email}</div>
                <div>{member.role}</div>
                <div>
                  <FaPencilAlt
                    color="#3F8EFC"
                    size={"1.6rem"}
                    cursor={"pointer"}
                  />
                  <span style={{ padding: "0 1rem" }}></span>
                  <FaTrashAlt
                    color="#D70000"
                    size={"1.6rem"}
                    cursor="pointer"
                  />
                </div>
              </TableData>
            ))}
          </Row>
        </Row>
        <Pagination count={memberData.length} />
        {/* <BottomDiv>
          <div>showing 1 to 5 of 2 pages</div>
        </BottomDiv> */}
      </Row>
    </StyledDiv>
  );
}

export default Members;
