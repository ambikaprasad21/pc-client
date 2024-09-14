import { useState } from "react";
import Button from "../ui/Button";
import styles from "./Notifications.module.css";
import { BsBellFill } from "react-icons/bs";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  getNotifications,
  markNotificationSeen,
} from "../services/functions/notificationFn";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";
// const notifiData = [
//   {
//     id: 1,
//     time: "12:00 AM",
//     text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
//   },
//   {
//     id: 2,
//     time: "12:00 AM",
//     text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
//   },
//   {
//     id: 3,
//     time: "12:00 AM",
//     text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
//   },
//   {
//     id: 4,
//     time: "12:00 AM",
//     text: "To increase the distance between each dash in a dashed border, you can use the border-style property with the border-width and border-color properties alongside the border-image property for more precise control.",
//   },
// ];

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

const NoNotifications = styled.p`
  font-size: 2rem;
  font-weight: 300;
  background-color: #ccc;
  padding: 0 2rem;
`;

function Notifications() {
  // const [notifications, setNotifications] = useState(notifiData);
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotifications,
  });

  const [processingNotification, setProcessingNotification] = useState(null);

  const { isLoading: markLoading, mutate: markMutate } = useMutation({
    mutationKey: ["notification"],
    mutationFn: markNotificationSeen,
    onMutate: (notificationId) => {
      setProcessingNotification(notificationId);
    },
    onSuccess: () => {
      toast.success("Marked as seen");
      queryClient.invalidateQueries(["notification"]);
      setProcessingNotification(null);
    },
    onError: (err) => {
      toast.error(err.message);
      setProcessingNotification(null);
    },
  });

  const { isLoading: loadingDelete, mutate: deleteMutate } = useMutation({
    mutationKey: ["notification"],
    mutationFn: deleteNotification,
    onMutate: (notificationId) => {
      setProcessingNotification(notificationId);
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully.");
      queryClient.invalidateQueries(["notification"]);
      setProcessingNotification(null);
    },
    onError: (err) => {
      toast.error(err.message);
      setProcessingNotification(null);
    },
  });

  function getTime(createdAt) {
    const date = new Date(createdAt);
    const options = {
      hour: "numeric",
      minutes: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const formatedTime = date.toLocaleString("en-US", options);
    return formatedTime;
  }

  if (isLoading) return <SpinnerSm />;
  return (
    <StyledDiv>
      {notifications.length === 0 && (
        <NoNotifications>There are no notifications for now.</NoNotifications>
      )}
      {notifications.map((el) => (
        <Container key={el._id}>
          <BsBellFill />
          <Content>
            <time>{getTime(el.createdAt)}</time>
            <p>{el.text}</p>
            <div>
              <Button
                variation="danger"
                size="small"
                onClick={() => deleteMutate(el.id)}
              >
                {processingNotification === el._id ? <SpinnerSm /> : "Delete"}
              </Button>
              <span></span>
              <Button
                variation="secondary"
                size="small"
                onClick={() => markMutate(el.id)}
              >
                {processingNotification === el._id ? (
                  <SpinnerSm />
                ) : el.seen ? (
                  "Already read"
                ) : (
                  "Mark as read"
                )}
              </Button>
            </div>
          </Content>
        </Container>
      ))}
    </StyledDiv>
  );
}

export default Notifications;
