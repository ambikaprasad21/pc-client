import styled from "styled-components";
import styles from "./AppHeader.module.css";
import { MdMenu, MdChat, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useUser } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/functions/notificationFn";
import { getAllMessageFn } from "../services/functions/messageFn";

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
  const { user } = useUser();
  const { data: notifications } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotifications,
  });

  const { data: messagesData } = useQuery({
    queryKey: ["messages"],
    queryFn: getAllMessageFn,
  });

  const unseenNotifications =
    notifications?.filter((data) => !data.seen).length > 9
      ? "9+"
      : notifications?.filter((data) => !data.seen).length;

  const unseenMessages =
    messagesData?.filter((data) => !data.seen).length > 9
      ? "9+"
      : messagesData?.filter((data) => !data.seen).length;
  return (
    <StyledHeader>
      <MdMenu size="2rem" />

      <HeadOptions>
        <MessageIcon newMessages={unseenMessages} />
        <NotifiIcon newNotifi={unseenNotifications} />
        <Link to={"profile"} title="User profile">
          <Avatar
            src={user?.photo}
            name={`${user.firstName} ${user.lastName}`}
            size={"small"}
          />
        </Link>
      </HeadOptions>
    </StyledHeader>
  );
}

const MessageIcon = ({ newMessages = "" }) => {
  return (
    <Link
      to={"/messages"}
      className={styles["message-icon-container"]}
      title="messages"
    >
      <MdChat size="2.4rem" color="gray" />
      {newMessages !== "" && (
        <span className={styles.badge}>{newMessages}</span>
      )}
    </Link>
  );
};

const NotifiIcon = ({ newNotifi = "" }) => {
  return (
    <Link
      to={"/notifications"}
      className={styles["message-icon-container"]}
      title="notifications"
    >
      <MdNotifications size="2.4rem" color="gray" />
      {newNotifi !== "" && <span className={styles.badge}>{newNotifi}</span>}
    </Link>
  );
};

export default AppHeader;
