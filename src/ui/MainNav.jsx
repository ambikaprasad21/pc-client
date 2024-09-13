import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import {
//   HiOutlineCalendarDays,
//   HiOutlineCog6Tooth,
//   HiOutlineHome,
//   HiOutlineHomeModern,
// } from "react-icons/hi2";

// import {
//   HiOutlineViewGrid,
//   //   HiOutlineUsers,
//   HiOutlineTrash,
//   HiOutlineUserGroup,
//   HiOutlineChartPie,
// } from "react-icons/hi";

import {
  MdDashboard,
  MdGroup,
  MdAnalytics,
  MdDelete,
  MdDynamicFeed,
  MdLan,
} from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

// import { MdRestore } from "react-icons/md";

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: #636363;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 5rem;

    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #1c5ef2;
    background-color: #7291d91c;
    border-left: 5px solid #3573f8;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #ddd;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #1c5ef2;
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <MdDashboard />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/my-projects">
            <MdDynamicFeed />
            <span>My Projects</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/members">
            <MdGroup />
            <span>Members</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/projects">
            <MdLan />
            <span>Projects</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/analytics">
            <MdAnalytics />
            <span>Analytics</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/trash">
            <FaTrashAlt />
            <span>Trash</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
