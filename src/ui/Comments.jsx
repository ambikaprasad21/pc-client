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

// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

const StyledDiv = styled.div`
  display: flex;
  gap: 4rem;
  /* padding: 5rem 4rem; */
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
    /* align-self: center; */
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
  const { tid } = useParams();
  const [comments, setComments] = useState([]);
  const [typeComment, setTypeComment] = useState("");
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  useEffect(() => {
    const filteredComments = commentsData.filter((el) => el.taskId === +tid);
    setComments(filteredComments);
  }, [tid]);

  return (
    <StyledDiv>
      {comments && comments.length !== 0 && (
        <StyledComments>
          {comments.map((comment) => (
            <CommentData key={comment.id} type="horizontal">
              <div>
                <Avatar
                  src={comment.photo}
                  size={"small"}
                  name={comment.userName}
                />
              </div>

              <Row>
                <Row type="horizontal">
                  <Row type="horizontal">
                    <Username>{comment.userName}</Username>
                    <Time>{comment.time}</Time>
                  </Row>
                  <Role>
                    <MdVerifiedUser />
                    <div>{comment.role}</div>
                  </Role>
                </Row>
                <StyledArticle>{comment.text}</StyledArticle>
              </Row>
            </CommentData>
          ))}
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
          <Button
            variation={"secondary"}
            size="medium"
            onClick={() => console.log(typeComment)}
          >
            Submit
          </Button>
        </div>
      </CommBtn>
    </StyledDiv>
  );
}

export default Comments;