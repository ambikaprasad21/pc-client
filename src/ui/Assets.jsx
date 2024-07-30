import styled from "styled-components";
import Row from "./Row";
import { BsCloudPlusFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import taskData from "../data/taskData";

const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background-color: #ececec7a;
`;

const TC = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;

  div {
    font-size: 1.6rem;
    font-weight: 550;
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const TableData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  margin: 1.8rem 0;
`;
const DTC = styled.div`
  padding-left: 20px;
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  padding-left: 20px;
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const HoverText = styled.div`
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
`;
const StyledBsCloudPlusFill = styled(BsCloudPlusFill)`
  &:hover + ${HoverText} {
    visibility: visible;
    opacity: 1;
  }
`;

function Assets() {
  const [task, setTask] = useState(null);

  const { tid } = useParams();

  useEffect(() => {
    function getTaskById(tid) {
      setTask(taskData.find((item) => item.id === +tid));
      console.log(task);
    }

    getTaskById(tid);
  }, [tid]);

  return (
    <Row>
      {task && (
        <>
          <div>
            <TableHead>
              <TC>
                <img src="/images/image-icon.png" alt="icon for image" />
                <div>Images</div>
              </TC>
              <IconContainer>
                <StyledBsCloudPlusFill size={"2rem"} color="blue" />
                <HoverText>Upload file</HoverText>
              </IconContainer>
            </TableHead>
            {task.attachments["images"].map((img, index) => (
              <TableData key={index}>
                <StyledLink
                  to={`${img}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Img src={img} />
                  <div>{img}</div>
                </StyledLink>
                <MdDelete color="red" size={"2rem"} cursor={"pointer"} />
              </TableData>
            ))}
          </div>
          <div>
            <TableHead>
              <TC>
                <img src="/images/pdf-icon.png" alt="icon for pdfs" />
                <div>Pdfs</div>
              </TC>
              <IconContainer>
                <StyledBsCloudPlusFill size={"2rem"} color="blue" />
                <HoverText>Upload file</HoverText>
              </IconContainer>
            </TableHead>
            {task.attachments.pdfs.map((pdf, index) => (
              <TableData key={index}>
                <StyledLink
                  to={`${pdf}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Img src="/images/pdf-placeholder.png" />
                  <div>name of pdf</div>
                </StyledLink>

                <MdDelete color="red" size={"2rem"} cursor={"pointer"} />
              </TableData>
            ))}
          </div>
        </>
      )}
    </Row>
  );
}

export default Assets;
