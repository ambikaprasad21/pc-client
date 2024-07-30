import { NavLink, Outlet } from "react-router-dom";
import styles from "./Task.module.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: flex-start;
`;

function Task() {
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
