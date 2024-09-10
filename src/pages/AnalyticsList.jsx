import { useNavigate } from "react-router-dom";
import projectData from "../data/projectData";
import Button from "../ui/Button";
import Row from "../ui/Row";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/functions/projectFn";
import SpinnerSm from "../ui/SpinnerSm";
import { formatDate } from "../utility/formatDate";
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

const NoProject = styled.p`
  font-size: 2rem;
  font-weight: 300;
  background-color: #ccc;
  padding: 0 2rem;
`;

function AnalyticsList() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
  if (isLoading) return <SpinnerSm />;
  return (
    <Row gap="3rem">
      <Heading>Analyze Projects</Heading>
      <Container>
        {data.length === 0 && <NoProject>There are no projects.</NoProject>}
        {data.map((project) => (
          <Project key={project._id}>
            <Title>{project.title}</Title>
            <Deadline>{formatDate(project.deadline)}</Deadline>
            {/* <Buttons> */}
            <Button
              variation="primary"
              size="small"
              onClick={() =>
                navigate(`${project._id}/?project=${project.title}`)
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
