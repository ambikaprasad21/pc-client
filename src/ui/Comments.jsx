import { useParams } from "react-router-dom";
import commentsData from "../data/commentsData";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Row from "./../ui/Row";
import styled from "styled-components";
import { MdVerifiedUser } from "react-icons/md";
import Editor from "../components/Editor";
import Button from "./Button";
import LazyImage from "./../utility/LazyImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getComments } from "../services/functions/commentFn";
import SpinnerSm from "./SpinnerSm";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
`;

const CommentData = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  flex: 2;
`;
const Username = styled.div`
  color: #007aff;
  font-size: 1.4rem;
`;
const Time = styled.time`
  color: #cdcdd4;
  font-size: 1.4rem;
`;

const Role = styled.div`
  display: flex;

  gap: 1rem;
  align-items: center;
  color: #53ff16;
  font-size: 1.4rem;
`;

const StyledArticle = styled.article`
  font-size: 1.6rem;
  color: #747272;
  word-spacing: 5%;
`;

const NoComments = styled.div`
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

const CommBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentBox = styled.div`
  width: 30rem;
  height: 20rem;
`;

function Comments() {
  // const [comments, setComments] = useState([]);
  const [typeComment, setTypeComment] = useState("");
  const { user } = useUser();
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const { taskId } = useParams();
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(taskId),
  });

  const queryClient = useQueryClient();

  const { isLoading: commenting, mutate } = useMutation({
    mutationKey: ["comments"],
    mutationFn: createComment,
    onSuccess: () => {
      toast.success("Addedd comment successfully.");
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <SpinnerSm />;
  return (
    <StyledDiv>
      {comments && comments.length !== 0 && (
        <StyledComments>
          {comments.map((comment) => {
            if (!comment.author && !comment.manager) return null;

            const userName = comment.author
              ? `${comment.author.user.firstName} ${comment.author.user.lastName}`
              : `${comment.manager.firstName} ${comment.manager.lastName}`;
            return (
              <CommentData key={comment._id} type="horizontal">
                <div>
                  <Avatar
                    src={
                      comment.author
                        ? comment.user?.photo
                        : comment.manager?.photo
                    }
                    size={"small"}
                    name={userName}
                  />
                </div>

                <Row>
                  <Row type="horizontal">
                    <Row type="horizontal">
                      <Username>{userName}</Username>
                      <Time>
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </Time>
                    </Row>
                    <Role>
                      <MdVerifiedUser />
                      <div>
                        {comment.author ? comment.author.role : "Manager"}
                      </div>
                    </Role>
                  </Row>
                  <StyledArticle
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                </Row>
              </CommentData>
            );
          })}
        </StyledComments>
      )}

      {comments.length === 0 && (
        <NoComments>
          <LazyImage
            src={"/images/nocomments.jpg"}
            alt={"there are no comments. Make a comment illustration"}
          />
          <p>Join the conversation! Be the first to comment on this task.</p>
        </NoComments>
      )}

      <CommBtn>
        <CommentBox>
          <Editor
            text={typeComment}
            setText={setTypeComment}
            textareaplaceholder={"type here..."}
          />
        </CommentBox>
        <div>
          {typeComment && (
            <Button
              variation={"secondary"}
              size="medium"
              onClick={() => mutate({ taskId, typeComment, email: user.email })}
            >
              {commenting ? <SpinnerSm /> : "Submit"}
            </Button>
          )}
        </div>
      </CommBtn>
    </StyledDiv>
  );
}

export default Comments;
