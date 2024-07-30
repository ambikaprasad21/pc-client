import styled from "styled-components";
import SidebarLogo from "../ui/SidebarLogo";
import MainNav from "../ui/MainNav";

import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const StyledSideBar = styled.aside`
  background-color: #fff;
  padding: 1.2rem 0rem;
  border-right: 1px solid #f3f4f6;
  grid-row: 1/-1;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Logout = styled.button`
  cursor: pointer;
  padding: 1.2rem 2rem;
  border-radius: 9px;
  border: 2px solid #3f8efc;
  color: #3f8efc;
  background-color: transparent;
  font-size: 1.8rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    border: 2px solid #066eff;
    color: #066eff;
  }
`;

const StyledDiv = styled.div`
  align-self: center;
  margin-top: auto;
`;

function AppSideBar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/", { replace: true });
  }

  return (
    <StyledSideBar>
      <SidebarLogo />
      <MainNav />
      <StyledDiv>
        <Logout onClick={() => handleLogout()}>
          <span>Logout </span>
          <MdLogout />
        </Logout>
      </StyledDiv>
    </StyledSideBar>
  );
}

export default AppSideBar;
