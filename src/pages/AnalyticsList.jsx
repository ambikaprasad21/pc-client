import { useNavigate } from "react-router-dom";
import projectData from "../data/projectData";
import Button from "../ui/Button";
import Row from "../ui/Row";
import styled from "styled-components";
// import generatePdf from "../utility/generatePdf";

const Heading = styled.h2`
  font-size: 3rem;
  word-spacing: 5px;
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Project = styled.div`
  padding: 1rem 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #e4e8f1;
  gap: 1.8rem;
  width: 24rem;
  border-radius: 9px;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Deadline = styled.div`
  border: 1.5px solid red;
  font-size: 1.4rem;
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 9px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
function AnalyticsList() {
  const navigate = useNavigate();
  return (
    <Row gap="3rem">
      <Heading>Analyze Projects</Heading>
      <Container>
        {projectData.map((project) => (
          <Project key={project.id}>
            <Title>{project.title}</Title>
            <Deadline>{project.deadline}</Deadline>
            {/* <Buttons> */}
            <Button
              variation="primary"
              size="small"
              onClick={() =>
                navigate(`${project.id}/?project=${project.title}`)
              }
            >
              Analyze
            </Button>
            {/* <Button
                variation="secondary"
                size="small"
                onClick={() => generatePDF(projectReportData)}
              >
                Download report
              </Button> */}
            {/* </Buttons> */}
          </Project>
        ))}
      </Container>
    </Row>
  );
}

export default AnalyticsList;
