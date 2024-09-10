import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "./Task.module.css";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../services/functions/taskFn";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: flex-start;
`;

function Task() {
  const { taskId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["taskById"],
    queryFn: () => getTaskById(taskId),
  });
  console.log(data);
  return (
    <Container>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="info">Info</NavLink>
          </li>
          <li>
            <NavLink to="assets">Assets</NavLink>
          </li>
          <li>
            <NavLink to="task-members">Members</NavLink>
          </li>
          <li>
            <NavLink to="comments">Comments</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </Container>
  );
}

export default Task;
