import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import projectData from "./../data/projectData";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import styled from "styled-components";
import Row from "../ui/Row";
import { BsCloudPlusFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "../ui/Modal";
import CreateTask from "../modalwindows/CreateTask";
import UploadFile from "../modalwindows/UploadFile";
import ConfirmDelete from "../modalwindows/ConfirmDelete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAssetToProjectFn,
  getProjectById,
} from "../services/functions/projectFn";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  /* max-width: 120rem; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const TopBtn = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 1.6rem;
`;

const Row1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  margin-bottom: 4rem;

  p {
    font-size: 1.6rem;
    font-weight: 350;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const Video = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

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

function Project() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["projectById"],
    queryFn: () => getProjectById(projectId),
  });
  const queryClient = useQueryClient();

  const { isLoading: isAddingAsset, mutate } = useMutation({
    mutationKey: ["projectById"],
    mutationFn: addAssetToProjectFn,
    onSuccess: () => {
      toast.success("Asset addedd successfully.");
      queryClient.invalidateQueries(["projectById"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <SpinnerSm />;
  const isAssignedProjects = location.pathname.includes("assigned");
  return (
    <StyledDiv>
      <TopBtn>
        <Button
          variation="primary"
          size="medium"
          onClick={() => navigate(`/project/${projectId}/all-tasks`)}
        >
          All task
        </Button>
        {!isAssignedProjects && (
          <Modal>
            <Modal.Open opens="upload-pp">
              <Button variation="secondary" size="medium">
                + Add task
              </Button>
            </Modal.Open>
            <Modal.Window name={"upload-pp"}>
              <CreateTask id={projectId} />
            </Modal.Window>
          </Modal>
        )}
      </TopBtn>
      {data && (
        <Row>
          <Row1>
            <Title>{data.title}</Title>
            <p>{data.description}</p>
            <Video>
              <video
                src={`http://127.0.0.1:9000/uploads/videos/${data.video}`}
                controls
                preload="auto"
                width="640"
                height="360"
              />
            </Video>
          </Row1>
          <Row2>
            <h2>Attachments</h2>
            <Row>
              <div>
                <TableHead>
                  <TC>
                    <img src="/images/image-icon.png" alt="icon for image" />
                    <div>Images</div>
                  </TC>
                  {!isAssignedProjects && (
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
                          isLoading={isAddingAsset}
                          mutationFn={mutate}
                        />
                      </Modal.Window>
                    </Modal>
                  )}
                </TableHead>
                {data.images.map((img, index) => (
                  <TableData key={index}>
                    <StyledLink
                      to={`http://127.0.0.1:9000/uploads/images/${img}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      target="_blank"
                    >
                      <Img src={"/images/image-icon.png"} />
                      <div>{img}</div>
                    </StyledLink>
                    {!isAssignedProjects && (
                      <Modal>
                        <Modal.Open opens="delete-project-attachment">
                          <MdDelete
                            color="red"
                            size={"2rem"}
                            cursor={"pointer"}
                          />
                        </Modal.Open>
                        <Modal.Window name={"delete-project-attachment"}>
                          <ConfirmDelete />
                        </Modal.Window>
                      </Modal>
                    )}
                  </TableData>
                ))}
              </div>

              <div>
                <TableHead>
                  <TC>
                    <img src="/images/pdf-icon.png" alt="icon for pdfs" />
                    <div>Pdfs</div>
                  </TC>
                  {!isAssignedProjects && (
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
                          isLoading={isAddingAsset}
                          mutationFn={mutate}
                        />
                      </Modal.Window>
                    </Modal>
                  )}
                </TableHead>
                {data.pdfs.map((pdf, index) => (
                  <TableData key={index}>
                    <StyledLink
                      to={`http://127.0.0.1:9000/uploads/pdfs/${pdf}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      target="_blank"
                    >
                      <Img src="/images/pdf-placeholder.png" />
                      <div>{pdf}</div>
                    </StyledLink>

                    {!isAssignedProjects && (
                      <Modal>
                        <Modal.Open opens="delete-project-attachment">
                          <MdDelete
                            color="red"
                            size={"2rem"}
                            cursor={"pointer"}
                          />
                        </Modal.Open>
                        <Modal.Window name={"delete-project-attachment"}>
                          <ConfirmDelete />
                        </Modal.Window>
                      </Modal>
                    )}
                  </TableData>
                ))}
              </div>
            </Row>
          </Row2>
        </Row>
      )}
    </StyledDiv>
  );
}

export default Project;
