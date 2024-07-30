import { useState } from "react";
import Button from "../ui/Button";
import styles from "./Notifications.module.css";
import { BsBellFill } from "react-icons/bs";
import styled from "styled-components";
const notifiData = [
  {
    id: 1,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
  },
  {
    id: 2,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
  },
  {
    id: 3,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
  },
  {
    id: 4,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
  },
];

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  max-width: 120rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid #dbd8d8;

  svg {
    color: #3f8efc;
    font-size: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;

  time {
    font-size: 1.4rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #5c5c5c;
  }
  span {
    padding: 0 1rem;
  }
`;

function Notifications() {
  const [notifications, setNotifications] = useState(notifiData);
  return (
    <StyledDiv>
      {notifications.map((el) => (
        <Container key={el.id}>
          <BsBellFill />
          <Content>
            <time>{el.time}</time>
            <p>{el.text}</p>
            <div>
              <Button variation="danger" size="small">
                Delete
              </Button>
              <span></span>
              <Button variation="secondary" size="small">
                Mark as read
              </Button>
            </div>
          </Content>
        </Container>
      ))}
    </StyledDiv>
  );
}

export default Notifications;
