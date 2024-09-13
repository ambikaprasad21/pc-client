import styles from "./Messages.module.css";
import { useState } from "react";
import Button from "../ui/Button";
import { BsBellFill } from "react-icons/bs";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllMessageFn,
  deleteMessageFn,
  getAllMessageFn,
  markMessageReadFn,
} from "../services/functions/messageFn";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";

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

const NoMessages = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

function Messages() {
  const { data: messagesData, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: getAllMessageFn,
  });

  console.log(messagesData);

  const queryClient = useQueryClient();

  const { isLoading: isMarking, mutate: markeMessageRead } = useMutation({
    mutationKey: ["messages"],
    mutationFn: markMessageReadFn,
    onSuccess: () => {
      toast.success("Message marked as read.");
      queryClient.invalidateQueries(["messages"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: deleting, mutate: deleteMessage } = useMutation({
    mutationKey: ["messages"],
    mutationFn: deleteMessageFn,
    onSuccess: () => {
      toast.success("Message deleted.");
      queryClient.invalidateQueries(["messages"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: deletingAll, mutate: deleteAllMessage } = useMutation({
    mutationKey: ["messages"],
    mutationFn: deleteAllMessageFn,
    onSuccess: () => {
      toast.success("All messages deleted.");
      queryClient.invalidateQueries(["messages"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <SpinnerSm />;

  if (messagesData && messagesData.length === 0)
    return (
      <NoMessages>There are no new messages for you right now.</NoMessages>
    );

  return (
    <StyledDiv>
      {messagesData.length > 0 && (
        <DeleteAll>
          <Button
            size="small"
            variation="danger"
            onClick={() => deleteAllMessage()}
          >
            Delete all
          </Button>
        </DeleteAll>
      )}

      <div>
        {messagesData.map((el) => (
          <ContainerItems key={el.id}>
            <div>
              <Avatar
                src={el.sender?.photo}
                name={`${el.sender.firstName} ${el.sender.lastName}`}
                size={"small"}
              />
            </div>

            <Content>
              <SenderName>
                {`${el.sender.firstName} ${el.sender.lastName}`}
                <span style={{ color: "#b0b0b0" }}>{el.sender.email}</span>
              </SenderName>
              <Message>{el.message}</Message>
              <div>
                <Button
                  variation="danger"
                  size="small"
                  onClick={() => deleteMessage(el._id)}
                >
                  Delete
                </Button>
                <span></span>
                <Button
                  variation="secondary"
                  size="small"
                  onClick={() => markeMessageRead(el._id)}
                >
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
