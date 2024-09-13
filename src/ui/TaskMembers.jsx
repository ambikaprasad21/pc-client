import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import taskData from "./../data/taskData";
import Avatar from "../components/Avatar";
import styled from "styled-components";
import { BsThreeDotsVertical, BsCheckCircleFill } from "react-icons/bs";
import Row from "./Row";
import Modal from "./Modal";
import MessageMember from "../modalwindows/MessageMember";
import { useQuery } from "@tanstack/react-query";
import SpinnerSm from "./SpinnerSm";
import { getTaskById } from "../services/functions/taskFn";
import { useUser } from "../context/UserContext";
const StyledDiv = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-wrap: wrap;
`;

const Member = styled.div`
  position: relative;
  background-color: #fbfbfb;
  padding: 1.8rem 2rem;
  border: 1px solid #e4e4e4;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  /* z-index: 100; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  /* background-color: #e5e5e5; */
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 12rem;
  overflow: hidden;
  /* opacity: ${(props) => (props.show ? 1 : 0)}; */
  display: ${(props) => (props.show ? "block" : "none")};
  transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 1;
`;

const MenuItem = styled.div`
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`;

const NameMail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 2rem;
  color: #535f75;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Email = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  color: #adaeb0;
`;

const About = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 2rem;
  margin-bottom: 1rem;

  color: #8b95a0;
`;

const Experience = styled.div`
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
`;

const NumLab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Number = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #535f75;
`;

const Label = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: #cdcdd4;
`;
function TaskMembers() {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(null);
  const menuRef = useRef(null);

  const { taskId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["taskById"],
    queryFn: () => getTaskById(taskId),
  });

  const toggleMenu = (id, event) => {
    event.stopPropagation();
    if (showMenu === id) {
      setShowMenu(null);
    } else {
      setShowMenu(id);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   setMembers(taskData.find((task) => task.id === +tid).members);
  // }, [tid]);

  if (isLoading) return <SpinnerSm />;
  const showDeleteBtn = data && user.projectsCreated.includes(data.projectId);
  return (
    <StyledDiv>
      {data &&
        data.taskMembers.map((member) => (
          <Member key={member._id}>
            <IconWrapper
              onClick={(event) => toggleMenu(member._id, event)}
              ref={menuRef}
            >
              <BsThreeDotsVertical size={"1.4rem"} />
              <Menu
                show={showMenu === member._id}
                ref={showMenu === member._id ? menuRef : null}
              >
                <Modal>
                  <Modal.Open opens="upload-pp">
                    <MenuItem>Message</MenuItem>
                  </Modal.Open>
                  <Modal.Window name={"upload-pp"}>
                    <MessageMember userId={member.member.user._id} />
                  </Modal.Window>
                </Modal>

                {showDeleteBtn && <MenuItem>Delete</MenuItem>}
              </Menu>
            </IconWrapper>

            <Details>
              <Avatar
                src={member.member.user?.photo}
                name={`${member.member.user.firstName} ${member.member.user.lastName}`}
                size={"medium"}
              />
              <NameMail>
                <Name>
                  {`${member.member.user.firstName} ${member.member.user.lastName}`}{" "}
                  {member.marked && <BsCheckCircleFill color="green" />}
                </Name>
                <Email>{member.member.user.email}</Email>
              </NameMail>
              <Row>
                <About>{member.member.user.bio}</About>
                {/* <Experience>
                  <NumLab>
                    <Number>{member.projects}</Number>
                    <Label>Project</Label>
                  </NumLab>
                  <NumLab>
                    <Number>{member.tasks}</Number>
                    <Label>Tasks</Label>
                  </NumLab>
                </Experience> */}
              </Row>
            </Details>
          </Member>
        ))}
    </StyledDiv>
  );
}

export default TaskMembers;
