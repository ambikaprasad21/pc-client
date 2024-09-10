import taskData from "../data/taskData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../services/functions/taskFn";
import SpinnerSm from "./SpinnerSm";
import { formatDate } from "../utility/formatDate";

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
    font-weight: 500;
  }

  p {
    font-size: 1.6rem;
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
  const [task, setTask] = useState(null);

  const { taskId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["taskById"],
    queryFn: () => getTaskById(taskId),
  });

  // useEffect(() => {
  //   setTask(taskData.filter((el) => el.id === +tid));
  // }, [tid]);

  if (isLoading) return <SpinnerSm />;

  return (
    <StyledDiv>
      <TitleDesc>
        <div>{data.title}</div>
        <p>{data.description}</p>
      </TitleDesc>
      <Important>
        <Deadline>
          <div>Deadline</div>
          <time>{formatDate(data.deadline)}</time>
        </Deadline>
        <div>
          <Button variation="secondary" size="medium">
            Mark as completed
          </Button>
        </div>
      </Important>
    </StyledDiv>
  );
}

export default Info;
