import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import taskData from "./../data/taskData";
import Avatar from "../components/Avatar";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import Row from "./Row";
import Modal from "./Modal";
import MessageMember from "../modalwindows/MessageMember";

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
  opacity: ${(props) => (props.show ? 1 : 0)};
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
  const { tid } = useParams();
  const [members, setMembers] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const menuRef = useRef(null);

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

  useEffect(() => {
    setMembers(taskData.find((task) => task.id === +tid).members);
  }, [tid]);
  return (
    <StyledDiv>
      {members &&
        members.map((member) => (
          <Member key={member.id}>
            <IconWrapper
              onClick={(event) => toggleMenu(member.id, event)}
              ref={menuRef}
            >
              <BsThreeDotsVertical size={"1.4rem"} />
              <Menu show={showMenu === member.id}>
                <Modal>
                  <Modal.Open opens="upload-pp">
                    <MenuItem>Message</MenuItem>
                  </Modal.Open>
                  <Modal.Window name={"upload-pp"}>
                    <MessageMember />
                  </Modal.Window>
                </Modal>

                <MenuItem>Delete</MenuItem>
              </Menu>
            </IconWrapper>
            <Details>
              <Avatar src={member?.photo} size={"medium"} />
              <NameMail>
                <Name>{member.fullName}</Name>
                <Email>{member.email}</Email>
              </NameMail>
              <Row>
                <About>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam adipisci aliquam animi officiis neque ducimus
                  voluptatem debitis facilis modi.
                </About>
                <Experience>
                  <NumLab>
                    <Number>{member.projects}</Number>
                    <Label>Project</Label>
                  </NumLab>
                  <NumLab>
                    <Number>{member.tasks}</Number>
                    <Label>Tasks</Label>
                  </NumLab>
                </Experience>
              </Row>
            </Details>
          </Member>
        ))}
    </StyledDiv>
  );
}

export default TaskMembers;
