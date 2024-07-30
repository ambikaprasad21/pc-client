import { Link } from "react-router-dom";
import styled from "styled-components";

const Img = styled.img`
  height: 7rem;
  width: auto;
`;

function SidebarLogo() {
  return (
    <Link to={"/"}>
      <Img src="/images/logo.png" alt="company logo." />
    </Link>
  );
}

export default SidebarLogo;
