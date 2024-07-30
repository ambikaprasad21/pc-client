import styles from "./Messages.module.css";
import { useState } from "react";
import Button from "../ui/Button";
import { BsBellFill } from "react-icons/bs";
import styled from "styled-components";
import Avatar from "../components/Avatar";
const messagesData = [
  {
    id: 1,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
    photo: "/images/z.jpg",
    senderName: "John Doe",
  },
  {
    id: 2,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
    photo: "/images/z.jpg",
    senderName: "John Doe",
  },
  {
    id: 3,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
    photo: "/images/z.jpg",
    senderName: "John Doe",
  },
  {
    id: 4,
    time: "12:00 AM",
    text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
    photo: "/images/z.jpg",
    senderName: "John Doe",
  },
];

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  max-width: 120rem;
`;

const DeleteAll = styled.div`
  align-self: flex-end;
`;

const ContainerItems = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid #dbd8d8;
  margin-bottom: 4rem;

  svg {
    color: #3f8efc;
    font-size: 2rem;
  }
`;

const SenderName = styled.p`
  font-size: 1.6rem;
  color: #000000;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;

  time {
    font-size: 1.4rem;
  }

  span {
    padding: 0 1rem;
  }
`;

const Message = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #5c5c5c;
`;

function Messages() {
  return (
    <StyledDiv>
      <DeleteAll>
        <Button size="small" variation="danger">
          Delete all
        </Button>
      </DeleteAll>

      <div>
        {messagesData.map((el) => (
          <ContainerItems key={el.id}>
            <div>
              <Avatar src={`${el.photo}`} size={"small"} name={`${el.name}`} />
            </div>

            <Content>
              <SenderName>{el.senderName}</SenderName>
              <Message>{el.text}</Message>
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
          </ContainerItems>
        ))}
      </div>
    </StyledDiv>
  );
}

export default Messages;
