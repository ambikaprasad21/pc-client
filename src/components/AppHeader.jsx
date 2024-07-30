import styled from "styled-components";
import styles from "./AppHeader.module.css";
import { MdMenu, MdChat, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const StyledHeader = styled.header`
  /* z-index: 10; */
  background-color: #ffffff;
  padding: 1.2rem 2rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  height: 5rem;
`;

const HeadOptions = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

function AppHeader() {
  return (
    <StyledHeader>
      <MdMenu size="2rem" />

      <HeadOptions>
        <MessageIcon newMessages={4} />
        <NotifiIcon newNotifi={4} />
        <Link to={"profile"}>
          <Avatar src={"/images/z.jpg"} name={"Test User"} size={"small"} />
        </Link>
      </HeadOptions>
    </StyledHeader>
  );
}

const MessageIcon = ({ newMessages }) => {
  return (
    <Link to={"/messages"} className={styles["message-icon-container"]}>
      <MdChat size="2.4rem" color="gray" />
      {newMessages > 0 && <span className={styles.badge}>{newMessages}</span>}
    </Link>
  );
};

const NotifiIcon = ({ newNotifi }) => {
  return (
    <Link to={"/notifications"} className={styles["message-icon-container"]}>
      <MdNotifications size="2.4rem" color="gray" />
      {newNotifi > 0 && <span className={styles.badge}>{newNotifi}</span>}
    </Link>
  );
};

export default AppHeader;
