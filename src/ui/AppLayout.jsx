import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppSideBar from "../components/AppSideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: #f9fafb;
  padding: 4rem 4.8rem 4.6rem;
  overflow-y: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <AppHeader />
      <AppSideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
