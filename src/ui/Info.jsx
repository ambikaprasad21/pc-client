import taskData from "../data/taskData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, markTaskCompletedFn } from "../services/functions/taskFn";
import SpinnerSm from "./SpinnerSm";
import { formatDate } from "../utility/formatDate";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const TitleDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  div {
    font-size: 2rem;
    font-weight: 300;
  }

  p {
    font-size: 2rem;
    font-weight: 300;
  }
`;

const Important = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Deadline = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  background-color: #ddd;
  padding: 5px 9px;
  align-self: flex-start;
  border-radius: 2px;

  div {
    background-color: #f8202d;
    color: #fff;
    padding: 5px 9px;
    border-radius: 2px;
    font-size: 1.4rem;
    font-weight: 600;
  }

  time {
    font-size: 1.4rem;
    color: #000000;
    font-weight: 500;
  }
`;

function Info() {
  const { user } = useUser();

  const { taskId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["taskById"],
    queryFn: () => getTaskById(taskId),
  });

  const queryClient = useQueryClient();
  const { isLoading: isMarking, mutate } = useMutation({
    mutationKey: ["taskById"],
    mutationFn: markTaskCompletedFn,
    onSuccess: () => {
      toast.success("Task marked.");
      queryClient.invalidateQueries(["taskById"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <SpinnerSm />;

  const isMember = data.taskMembers.some(
    (member) => member.member.user._id === user._id
  );

  const memberDetail = data.taskMembers.find(
    (member) => member.member.user._id === user._id
  );

  const isMarked = memberDetail ? memberDetail.marked : false;

  return (
    <StyledDiv>
      <TitleDesc>
        <div>
          <span style={{ fontSize: "2.4rem", fontWeight: "500" }}>Title: </span>
          {data.title}
        </div>
        <p>
          <span style={{ fontSize: "2.4rem", fontWeight: "500" }}>
            Description:{" "}
          </span>
          {data.description}
        </p>
      </TitleDesc>
      <Important>
        <Deadline>
          <div>Deadline</div>
          <time>{formatDate(data.deadline)}</time>
        </Deadline>
        <div>
          {isMember && (
            <Button
              variation={isMarked ? "marked" : "secondary"}
              size="medium"
              disabled={isMarking}
              onClick={() => mutate(taskId)}
            >
              {isMarked && !isMarking
                ? "Already Completed"
                : "Mark as Completed"}
              {isMarking && <SpinnerSm />}
            </Button>
          )}
        </div>
      </Important>
    </StyledDiv>
  );
}

export default Info;
