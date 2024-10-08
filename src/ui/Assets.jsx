import styled from "styled-components";
import Row from "./Row";
import { BsCloudPlusFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import taskData from "../data/taskData";
import Modal from "./Modal";
import UploadFile from "../modalwindows/UploadFile";
import ConfirmDelete from "../modalwindows/ConfirmDelete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SpinnerSm from "./SpinnerSm";
import {
  addAssetToTaskFn,
  getTaskById,
  removeAssetTaskFn,
} from "../services/functions/taskFn";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { ASSETAPI } from "../utility/constant";

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
  const { user } = useUser();
  const { taskId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["taskById"],
    queryFn: () => getTaskById(taskId),
  });

  const queryClient = useQueryClient();

  const { isLoading: addingAsset, mutate } = useMutation({
    mutationKey: ["taskById"],
    mutationFn: addAssetToTaskFn,
    onSuccess: () => {
      toast.success("Addedd asset successfully.");
      queryClient.invalidateQueries(["taskById"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: isDeleting, mutate: onDelete } = useMutation({
    mutationKey: ["taskById"],
    mutationFn: removeAssetTaskFn,
    onSuccess: () => {
      toast.success("File removed successfully.");
      queryClient.invalidateQueries(["taskById"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <SpinnerSm />;

  const showUploadBtn = data && user.projectsCreated.includes(data.projectId);

  return (
    <Row>
      {data && (
        <>
          <div>
            <TableHead>
              <TC>
                <img src="/images/image-icon.png" alt="icon for image" />
                <div>Images</div>
              </TC>
              {showUploadBtn && (
                <Modal>
                  <Modal.Open opens="upload-project-attachment">
                    <IconContainer>
                      <StyledBsCloudPlusFill size={"2rem"} color="blue" />
                      <HoverText>Upload file</HoverText>
                    </IconContainer>
                  </Modal.Open>
                  <Modal.Window name={"upload-project-attachment"}>
                    <UploadFile
                      fileType={"image"}
                      id={data._id}
                      isLoading={addingAsset}
                      mutationFn={mutate}
                    />
                  </Modal.Window>
                </Modal>
              )}
            </TableHead>
            {data.images.map((img, index) => (
              <TableData key={index}>
                <StyledLink
                  to={`${ASSETAPI}/uploads/images/${img.location}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  target="_blank"
                >
                  <Img src={"/images/image-icon.png"} />
                  <div>{img.name}</div>
                </StyledLink>
                <Modal>
                  <Modal.Open opens="delete-project-attachment">
                    <MdDelete color="red" size={"2rem"} cursor={"pointer"} />
                  </Modal.Open>
                  <Modal.Window name={"delete-project-attachment"}>
                    <ConfirmDelete
                      isDeleting={isDeleting}
                      onConfirmDelete={() =>
                        onDelete({
                          id: taskId,
                          fileName: img.location,
                        })
                      }
                    />
                  </Modal.Window>
                </Modal>
              </TableData>
            ))}
          </div>
          <div>
            <TableHead>
              <TC>
                <img src="/images/pdf-icon.png" alt="icon for pdfs" />
                <div>Pdfs</div>
              </TC>
              {showUploadBtn && (
                <Modal>
                  <Modal.Open opens="upload-project-attachment">
                    <IconContainer>
                      <StyledBsCloudPlusFill size={"2rem"} color="blue" />
                      <HoverText>Upload file</HoverText>
                    </IconContainer>
                  </Modal.Open>
                  <Modal.Window name={"upload-project-attachment"}>
                    <UploadFile
                      fileType={"pdf"}
                      id={data._id}
                      isLoading={addingAsset}
                      mutationFn={mutate}
                    />
                  </Modal.Window>
                </Modal>
              )}
            </TableHead>
            {data.pdfs.map((pdf, index) => (
              <TableData key={index}>
                <StyledLink
                  to={`${ASSETAPI}/uploads/pdfs/${pdf.location}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  target="_blank"
                >
                  <Img src="/images/pdf-placeholder.png" />
                  <div>{pdf.name}</div>
                </StyledLink>

                <Modal>
                  <Modal.Open opens="delete-project-attachment">
                    <MdDelete color="red" size={"2rem"} cursor={"pointer"} />
                  </Modal.Open>
                  <Modal.Window name={"delete-project-attachment"}>
                    <ConfirmDelete
                      isDeleting={isDeleting}
                      onConfirmDelete={() =>
                        onDelete({
                          id: taskId,
                          fileName: pdf.location,
                        })
                      }
                    />
                  </Modal.Window>
                </Modal>
              </TableData>
            ))}
          </div>
        </>
      )}
    </Row>
  );
}

export default Assets;
