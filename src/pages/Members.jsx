import Button from "./../ui/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import memberData from "./../data/memberData";
import Avatar from "./../components/Avatar";
import Row from "./../ui/Row";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../utility/constant";
import Modal from "../ui/Modal";
import AddMember from "../modalwindows/AddMember";
import EditMember from "../modalwindows/EditMember";
import ConfirmDelete from "../modalwindows/ConfirmDelete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMemberFn, getMemberFn } from "../services/functions/memberFn";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StyledAddMember = styled.div`
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
  grid-template-columns: 0.8fr 1fr 2fr 1.6fr 1.6fr 1fr;
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
  grid-template-columns: 0.8fr 1fr 2fr 1.6fr 1.6fr 1fr;
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
  const { data: memberData } = useQuery({
    queryKey: ["members"],
    queryFn: getMemberFn,
  });

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationKey: ["members"],
    mutationFn: deleteMemberFn,
    onSuccess: () => {
      toast.success("Member deleted successfully.");
      queryClient.invalidateQueries(["members"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = memberData?.length;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const from = (page - 1) * PAGE_SIZE + 1 - 1;
  const to = page === pageCount ? count : page * PAGE_SIZE;

  const [members, setMembers] = useState(memberData?.slice(from, to));

  useEffect(() => {
    setMembers(memberData?.slice(from, to));
  }, [page, memberData]);

  if (!memberData) return <SpinnerSm />;

  return (
    <StyledDiv>
      <StyledAddMember>
        <Modal>
          <Modal.Open opens="add-member">
            <Button variation="secondary" size="medium">
              + Add member
            </Button>
          </Modal.Open>
          <Modal.Window name={"add-member"}>
            <AddMember />
          </Modal.Window>
        </Modal>
      </StyledAddMember>
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
            <div>Title</div>
            <div>Action</div>
          </TableHead>
          <Row gap="1.6rem">
            {members?.map((member) => (
              <TableData key={member._id}>
                <div>
                  <Avatar
                    src={member?.photo}
                    name={`${member.user.firstName} ${member.user.lastName}`}
                    size={"medium"}
                  />
                </div>
                <div>{`${member.user.firstName} ${member.user.lastName}`}</div>
                <div>{member.user.email}</div>
                <div>{member.role}</div>
                <div>{member.title}</div>
                <div>
                  <Modal>
                    <Modal.Open opens="upload-pp">
                      <FaPencilAlt
                        color="#3F8EFC"
                        size={"1.6rem"}
                        cursor={"pointer"}
                      />
                    </Modal.Open>
                    <Modal.Window name={"upload-pp"}>
                      <EditMember data={member} />
                    </Modal.Window>
                  </Modal>

                  <span style={{ padding: "0 1rem" }}></span>

                  <Modal>
                    <Modal.Open opens="upload-pp">
                      <MdDelete color="red" size="2rem" cursor="pointer" />
                    </Modal.Open>
                    <Modal.Window name={"upload-pp"}>
                      <ConfirmDelete
                        isDeleting={isDeleting}
                        onConfirmDelete={() => mutate(member)}
                      />
                    </Modal.Window>
                  </Modal>
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
