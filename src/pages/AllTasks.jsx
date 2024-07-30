import { useEffect, useRef, useState } from "react";
import taskData from "./../data/taskData";
import commentData from "../data/commentsData";

import Row from "../ui/Row";
import SummaryCards from "../components/SummaryCards";
import Avatar from "./../components/Avatar";
import {
  BsBriefcaseFill,
  BsCheck2All,
  BsFillPauseFill,
  BsInfinity,
  BsThreeDotsVertical,
} from "react-icons/bs";

import { AiFillWechat } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Priority from "../ui/Priority";
import styled, { css } from "styled-components";
import Progress from "../ui/Progress";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6rem;
  border-top: 2px solid #dfdfdf;
  padding-top: 2rem;
`;

const ContainerItem = styled.div`
  cursor: pointer;
  width: 30rem;
  color: #696969;
  background-color: #f5f5f5;
  padding: 1rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  gap: 2rem;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MidDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #e5e5e5;
  cursor: pointer;
  position: relative;
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
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.6rem;
  font-weight: 600;

  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.2rem;
      font-weight: 550;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 1.8rem;
      font-weight: 550;
    `}
`;

const ProgCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Deadline = styled.div`
  font-size: 1.4rem;
  font-weight: 550;
  display: flex;
  gap: 1.2rem;

  span {
    color: red;
  }

  time {
    color: #696969;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;

  & > *:not(:first-child) {
    border: 2px solid white;
    margin-left: -12px;
  }
`;
const RemainingCount = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #dedede;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: -12px;
  z-index: 10;
`;

const IconSvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
`;

const IconSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 1.6rem;
`;

function AllTasks() {
  const [allTask, setAllTask] = useState(taskData);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (id) => {
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

  return (
    <StyledDiv>
      <Row type="horizontal">
        <SummaryCards
          Icon={BsBriefcaseFill}
          svgc={"3F8EFC"}
          svgbgc={"E3E9FF"}
          number={allTask.length}
        >
          Total tasks
        </SummaryCards>
        <SummaryCards
          Icon={BsCheck2All}
          svgc={"53FF16"}
          svgbgc={"E5FFE3"}
          number={allTask.reduce((acc, currval) => {
            if (currval.status === "completed") {
              acc++;
            }

            return acc;
          }, 0)}
        >
          Completed
        </SummaryCards>
        <SummaryCards
          Icon={BsFillPauseFill}
          svgc={"FF58DA"}
          svgbgc={"FFE3FE"}
          number={allTask.reduce((acc, currval) => {
            if (currval.status === "in-progress") {
              acc++;
            }

            return acc;
          }, 0)}
        >
          In-progress
        </SummaryCards>
        <SummaryCards
          Icon={BsInfinity}
          svgc={"F8202D"}
          svgbgc={"FEE8EA"}
          number={allTask.reduce((acc, currval) => {
            if (currval.status === "pending") {
              acc++;
            }

            return acc;
          }, 0)}
        >
          Pending
        </SummaryCards>
      </Row>
      <Container>
        {allTask.map((task) => (
          <ContainerItem
            onClick={() => navigate(`/project/1/task/${task.id}/info`)}
            key={task.id}
          >
            <TopDiv>
              <Priority variation={task.priority}>
                {task.priority.toUpperCase()}
              </Priority>
              <IconWrapper onClick={() => toggleMenu(task.id)} ref={menuRef}>
                <BsThreeDotsVertical />
                <Menu show={showMenu === task.id}>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </IconWrapper>
            </TopDiv>
            <MidDiv>
              <Title size="medium">{task.title}</Title>
              <ProgCont>
                <div>
                  <Title size="small">
                    <div>Progress</div>
                    <div>{task.progress}%</div>
                  </Title>
                </div>
                <Progress progress={task.progress} />
              </ProgCont>
              <Deadline>
                <span>Deadline :</span>
                <time>{task.deadline}</time>
              </Deadline>
            </MidDiv>
            <BottomDiv>
              <AvatarContainer>
                {task.members.slice(0, 3).map((item) => (
                  <Avatar
                    src={item.photo}
                    key={item.id}
                    name={item.fullName}
                    size={"small"}
                  />
                ))}
                {task.members.length > 3 && (
                  <RemainingCount>+{task.members.length - 3}</RemainingCount>
                )}
              </AvatarContainer>
              <IconSvgContainer>
                <IconSvg>
                  <AiFillWechat />
                  <div>
                    {commentData.reduce((acc, currval) => {
                      if (currval.taskId === task.id) {
                        acc++;
                      }
                      return acc;
                    }, 0)}
                  </div>
                </IconSvg>
                <IconSvg>
                  <MdAttachFile />
                  <div>
                    {task.attachments.images.length +
                      task.attachments.pdfs.length}
                  </div>
                </IconSvg>
              </IconSvgContainer>
            </BottomDiv>
          </ContainerItem>
        ))}
      </Container>
    </StyledDiv>
  );
}

export default AllTasks;
