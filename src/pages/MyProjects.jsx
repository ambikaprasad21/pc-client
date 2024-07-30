import styled, { css } from "styled-components";
import Button from "../ui/Button";
import Row from "../ui/Row";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical, BsBriefcaseFill } from "react-icons/bs";
import Progress from "../ui/Progress";
import { Link, useNavigate } from "react-router-dom";

import projectData from "./../data/projectData";

const StyledDiv = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CreateProject = styled.div`
  align-self: flex-end;
`;

const ProjectItems = styled.div`
  display: flex;
  gap: 1.8rem;
  flex-wrap: wrap;
  padding: 2rem 0rem;
`;

const ProjectItem = styled.div`
  width: 30rem;
  cursor: pointer;
  padding: 1.4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  background-color: #f6f6f6;
  border-radius: 10px;
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
`;

const Desc = styled.p`
  font-size: 1.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Manager = styled.div`
  font-size: 1.2rem;
  background-color: #e5e5e5;
  border-radius: 10px;
  padding: 5px 9px;
  align-self: flex-start;
`;
const TaskDeadline = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
  font-weight: 500;
`;
const Deadline = styled.time`
  background-color: rgba(120, 120, 128, 0.12);
  color: #007aff;
  padding: 4px 3px;
  border-radius: 5px;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  z-index: 100;
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

const ProgCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function MyProjects() {
  const [projects, setProjects] = useState(projectData);
  const [showMenu, setShowMenu] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <StyledDiv>
      <CreateProject>
        <Button size="medium" variation="secondary">
          + Create project
        </Button>
      </CreateProject>
      <ProjectItems>
        {projects.map((el) => (
          <ProjectItem
            onClick={() => navigate(`/my-projects/${el.id}`)}
            key={el.id}
          >
            <Title>
              <div>{el.title}</div>
              <IconWrapper
                onClick={(event) => toggleMenu(el.id, event)}
                ref={menuRef}
              >
                <BsThreeDotsVertical />
                <Menu show={showMenu === el.id}>
                  <MenuItem>Move to trash</MenuItem>
                  <MenuItem>Edit project</MenuItem>
                </Menu>
              </IconWrapper>
            </Title>
            <Row>
              <ProgCont>
                <div>
                  <Title size="small">
                    <div>Progress</div>
                    <div>{el.progress}%</div>
                  </Title>
                </div>
                <Progress progress={el.progress} />
              </ProgCont>
              <Desc>{el.description}</Desc>
              <Manager>
                <b>managed by :</b>
                <span> </span>
                {el.manager}
              </Manager>
              <TaskDeadline>
                <Task>
                  <BsBriefcaseFill color="007AFF" />
                  <div>
                    {el.tasks.length} Task
                    {`${el.tasks.length}` > 1 ? "s" : ""}
                  </div>
                </Task>
                <Deadline>{el.deadline}</Deadline>
              </TaskDeadline>
            </Row>
          </ProjectItem>
        ))}
      </ProjectItems>
    </StyledDiv>
  );
}
export default MyProjects;
