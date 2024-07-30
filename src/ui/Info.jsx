import taskData from "../data/taskData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

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
  const { tid } = useParams();

  useEffect(() => {
    setTask(taskData.filter((el) => el.id === +tid));
  }, [tid]);
  return (
    <StyledDiv>
      <TitleDesc>
        <div>Test task title</div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Massa sed sed commodo nisi
          eget mauris elementum. Pellentesque aenean facilisi eget non in proin
          tincidunt lectus.
        </p>
      </TitleDesc>
      <Important>
        <Deadline>
          <div>Deadline</div>
          <time>30 Aug 2024</time>
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
