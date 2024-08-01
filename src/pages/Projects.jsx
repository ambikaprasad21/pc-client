import styled, { css } from "styled-components";
import Row from "../ui/Row";
import { useState } from "react";
import { BsBriefcaseFill } from "react-icons/bs";
import Progress from "../ui/Progress";

const projectData = [
  {
    id: 1,
    title: "project title",
    description:
      "The project involves developing a comprehensive full-stack web application featuring user authentication, data visualization, and responsive design. Implementing RESTful APIs, integrating a robust backend with a MongoDB database, and utilizing React for a dynamic frontend experience ensures seamless performance. Collaboration tools streamline workflow, enhancing productivity and efficiency.",
    manager: "John Doe",
    deadline: "30 Aug 2024",
    progress: 70,
    tasks: [
      { id: 1, title: "test task", description: "test test description" },
      { id: 2, title: "test task", description: "test test description" },
      { id: 3, title: "test task", description: "test test description" },
      { id: 4, title: "test task", description: "test test description" },
      { id: 5, title: "test task", description: "test test description" },
      { id: 6, title: "test task", description: "test test description" },
      { id: 7, title: "test task", description: "test test description" },
      { id: 8, title: "test task", description: "test test description" },
      { id: 9, title: "test task", description: "test test description" },
      { id: 10, title: "test task", description: "test test description" },
    ],
  },
  {
    id: 2,
    title: "project title",
    description:
      "The project involves developing a comprehensive full-stack web application featuring user authentication, data visualization, and responsive design. Implementing RESTful APIs, integrating a robust backend with a MongoDB database, and utilizing React for a dynamic frontend experience ensures seamless performance. Collaboration tools streamline workflow, enhancing productivity and efficiency.",
    manager: "John Doe",
    deadline: "30 Aug 2024",
    progress: 70,
    tasks: [
      { id: 1, title: "test task", description: "test test description" },
      { id: 2, title: "test task", description: "test test description" },
      { id: 3, title: "test task", description: "test test description" },
      { id: 4, title: "test task", description: "test test description" },
      { id: 5, title: "test task", description: "test test description" },
      { id: 6, title: "test task", description: "test test description" },
      { id: 7, title: "test task", description: "test test description" },
      { id: 8, title: "test task", description: "test test description" },
      { id: 9, title: "test task", description: "test test description" },
      { id: 10, title: "test task", description: "test test description" },
    ],
  },
  {
    id: 3,
    title: "project title",
    description:
      "The project involves developing a comprehensive full-stack web application featuring user authentication, data visualization, and responsive design. Implementing RESTful APIs, integrating a robust backend with a MongoDB database, and utilizing React for a dynamic frontend experience ensures seamless performance. Collaboration tools streamline workflow, enhancing productivity and efficiency.",
    manager: "John Doe",
    deadline: "30 Aug 2024",
    progress: 70,
    tasks: [
      { id: 1, title: "test task", description: "test test description" },
      { id: 2, title: "test task", description: "test test description" },
      { id: 3, title: "test task", description: "test test description" },
      { id: 4, title: "test task", description: "test test description" },
      { id: 5, title: "test task", description: "test test description" },
      { id: 6, title: "test task", description: "test test description" },
      { id: 7, title: "test task", description: "test test description" },
      { id: 8, title: "test task", description: "test test description" },
      { id: 9, title: "test task", description: "test test description" },
      { id: 10, title: "test task", description: "test test description" },
    ],
  },
  {
    id: 4,
    title: "John Doe",
    description:
      "The project involves developing a comprehensive full-stack web application featuring user authentication, data visualization, and responsive design. Implementing RESTful APIs, integrating a robust backend with a MongoDB database, and utilizing React for a dynamic frontend experience ensures seamless performance. Collaboration tools streamline workflow, enhancing productivity and efficiency.",
    manager: "Manager name",
    deadline: "30 Aug 2024",
    progress: 70,
    tasks: [
      { id: 1, title: "test task", description: "test test description" },
      { id: 2, title: "test task", description: "test test description" },
      { id: 3, title: "test task", description: "test test description" },
      { id: 4, title: "test task", description: "test test description" },
      { id: 5, title: "test task", description: "test test description" },
      { id: 6, title: "test task", description: "test test description" },
      { id: 7, title: "test task", description: "test test description" },
      { id: 8, title: "test task", description: "test test description" },
      { id: 9, title: "test task", description: "test test description" },
      { id: 10, title: "test task", description: "test test description" },
    ],
  },
];

const StyledDiv = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    font-size: 2.4rem;
  }
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

const ProgCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function Projects() {
  const [projects, setProjects] = useState(projectData);

  return (
    <StyledDiv>
      <h2>Project Task Assigned</h2>
      <ProjectItems>
        {projects.map((el) => (
          <ProjectItem key={el.id}>
            <Title>
              <div>{el.title}</div>
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
export default Projects;
