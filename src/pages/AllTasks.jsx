import { useEffect, useRef, useState } from "react";
import taskData from "./../data/taskData";
import commentData from "../data/commentsData";

import Row from "../ui/Row";
import SummaryCards from "../components/SummaryCards";
import Avatar from "./../components/Avatar";
import {
  BsBriefcaseFill,
  BsCheck2All,
  BsFillPauseFill,
  BsInfinity,
  BsThreeDotsVertical,
} from "react-icons/bs";

import { AiFillWechat } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";

import { useNavigate, useParams } from "react-router-dom";
import Priority from "../ui/Priority";
import styled, { css } from "styled-components";
import Progress from "../ui/Progress";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTaskFn, getAllTasks } from "../services/functions/taskFn";
import SpinnerSm from "../ui/SpinnerSm";
import { formatDate } from "../utility/formatDate";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import ConfirmDelete from "../modalwindows/ConfirmDelete";
import EditTask from "../modalwindows/EditTask";
import LazyImage from "../utility/LazyImage";
import { useUser } from "../context/UserContext";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6rem;
  border-top: 2px solid #dfdfdf;
  padding-top: 2rem;
`;

const ContainerItem = styled.div`
  cursor: pointer;
  width: 30rem;
  color: #696969;
  background-color: #f5f5f5;
  padding: 1rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  gap: 2rem;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MidDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #e5e5e5;
  cursor: pointer;
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 12rem;
  overflow: hidden;
  /* opacity: ${(props) => (props.show ? 1 : 0)}; */
  display: ${(props) => (props.show ? "block" : "none")};
  transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 1;
`;

const MenuItem = styled.div`
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.6rem;
  font-weight: 600;

  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.2rem;
      font-weight: 550;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 1.8rem;
      font-weight: 550;
    `}
`;

const ProgCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Deadline = styled.div`
  font-size: 1.4rem;
  font-weight: 550;
  display: flex;
  gap: 1.2rem;

  span {
    color: red;
  }

  time {
    color: #696969;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;

  & > *:not(:first-child) {
    border: 2px solid white;
    margin-left: -12px;
  }
`;
const RemainingCount = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #dedede;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: -12px;
  z-index: 10;
`;

const IconSvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
`;

const IconSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 1.6rem;
`;

const NoTasks = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  span {
    display: flex !important ;
    justify-content: center;
  }

  img {
    width: 50%;
  }
  p {
    font-size: 1.8rem;
  }
`;

function AllTasks() {
  // const [allTask, setAllTask] = useState(taskData);
  const { user } = useUser();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(null);
  const menuRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["allTasks", projectId],
    queryFn: () => getAllTasks(projectId),
  });

  const queryClient = useQueryClient();

  const { isLoading: deletingTask, mutate } = useMutation({
    mutationKey: ["allTasks"],
    mutationFn: deleteTaskFn,
    onSuccess: () => {
      toast.success("Successfully deleted task.");
      queryClient.invalidateQueries(["allTasks"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    if (showMenu === id) {
      setShowMenu(null);
    } else {
      setShowMenu(id);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isManager = user.projectsCreated.some((id) => id === projectId);

  if (isLoading) return <SpinnerSm />;

  if (!data || !data.tasks || data.tasks.length === 0) {
    return (
      <NoTasks>
        <LazyImage
          src={"/images/no-task.jpg"}
          alt={"There are no tasks to work on."}
        />
        <p>There are no tasks to work on.</p>
      </NoTasks>
    );
  }

  return (
    <StyledDiv>
      <Row type="horizontal">
        <SummaryCards
          Icon={BsBriefcaseFill}
          svgc={"3F8EFC"}
          svgbgc={"E3E9FF"}
          number={data?.tasks.length}
        >
          Total tasks
        </SummaryCards>
        <SummaryCards
          Icon={BsCheck2All}
          svgc={"53FF16"}
          svgbgc={"E5FFE3"}
          number={data?.completed}
        >
          Completed
        </SummaryCards>
        <SummaryCards
          Icon={BsFillPauseFill}
          svgc={"FF58DA"}
          svgbgc={"FFE3FE"}
          number={data?.inProgress}
        >
          In-progress
        </SummaryCards>
        <SummaryCards
          Icon={BsInfinity}
          svgc={"F8202D"}
          svgbgc={"FEE8EA"}
          number={data?.pending}
        >
          Pending
        </SummaryCards>
      </Row>
      <Container>
        {data?.tasks.map((task) => (
          <ContainerItem
            onClick={() =>
              navigate(`/project/${projectId}/task/${task._id}/info`)
            }
            key={task._id}
          >
            <TopDiv>
              <Priority variation={task.priorityLevel.toLowerCase()}>
                {task.priorityLevel.toUpperCase()}
              </Priority>
              {isManager && (
                <IconWrapper
                  onClick={(e) => toggleMenu(task._id, e)}
                  ref={menuRef}
                >
                  <BsThreeDotsVertical />
                  <Menu
                    show={showMenu === task._id}
                    ref={showMenu === task._id ? menuRef : null}
                  >
                    <Modal>
                      <Modal.Open opens="editTask">
                        <MenuItem>Edit</MenuItem>
                      </Modal.Open>
                      <Modal.Window name={"editTask"}>
                        <EditTask data={task} />
                      </Modal.Window>
                    </Modal>

                    <Modal>
                      <Modal.Open opens="deleteTask">
                        <MenuItem>
                          {deletingTask ? "deleting..." : "Delete"}
                        </MenuItem>
                      </Modal.Open>
                      <Modal.Window name={"deleteTask"}>
                        <ConfirmDelete
                          isDeleting={deletingTask}
                          onConfirmDelete={() => mutate(task._id)}
                        />
                      </Modal.Window>
                    </Modal>
                  </Menu>
                </IconWrapper>
              )}
            </TopDiv>
            <MidDiv>
              <Title size="medium">{task.title}</Title>
              <ProgCont>
                <div>
                  <Title size="small">
                    <div>Progress</div>
                    <div>{Math.ceil(task.progress)} %</div>
                  </Title>
                </div>
                <Progress progress={Math.ceil(task.progress)} />
              </ProgCont>
              <Deadline>
                <span>Deadline :</span>
                <time>{formatDate(task.deadline)}</time>
              </Deadline>
            </MidDiv>
            <BottomDiv>
              <AvatarContainer>
                {task.taskMembers.slice(0, 3).map((item) => (
                  <Avatar
                    src={item.member.user?.photo}
                    key={item.member.user._id}
                    name={`${item.member.user.firstName} ${item.member.user.lastName}`}
                    size={"small"}
                  />
                ))}
                {task.taskMembers.length > 3 && (
                  <RemainingCount>
                    +{task.taskMembers.length - 3}
                  </RemainingCount>
                )}
              </AvatarContainer>
              <IconSvgContainer>
                <IconSvg>
                  <AiFillWechat />
                  <div>{task.comments}</div>
                </IconSvg>
                <IconSvg>
                  <MdAttachFile />
                  <div>{task.images.length + task.pdfs.length}</div>
                </IconSvg>
              </IconSvgContainer>
            </BottomDiv>
          </ContainerItem>
        ))}
      </Container>
    </StyledDiv>
  );
}

export default AllTasks;
