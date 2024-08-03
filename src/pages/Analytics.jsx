import { useRef } from "react";
import html2canvas from "html2canvas";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { differenceInDays, parse } from "date-fns";

import reportData from "../data/reportData";
import Row from "../ui/Row";
import Button from "../ui/Button";

import projectReportData from "../data/projectReportData";
import jsPDF from "jspdf";
import "jspdf-autotable";

const HeadBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12rem;
  justify-content: center;
  /* margin-bottom: 5rem; */

  p {
    font-size: 1.6rem;
  }
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DoughnutLegend = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* gap: 4rem; */
`;

const DLI = styled.div`
  display: flex;
  gap: 1rem;

  span {
    align-self: center;
    padding: 5px 5px;
  }
`;

function Analytics() {
  const containerRef = useRef(null);

  function onGeneratePdf() {
    if (containerRef.current) {
      html2canvas(containerRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        generatePdf(projectReportData, imgData);
      });
    }
    // generatePdf(projectReportData);
  }

  const doughnutData = {
    labels: ["Pending", "In-progress", "Completed"],
    datasets: [
      {
        label: "Task Progress",
        data: [
          (reportData.pending / reportData.totalTask) * 100,
          (reportData["in-progress"] / reportData.totalTask) * 100,
          (reportData.completed / reportData.totalTask) * 100,
        ],
        backgroundColor: ["#E14141", "#3F8EFC", "#53FF16"],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = doughnutData.labels[tooltipItem.dataIndex];
            const value = doughnutData.datasets[0].data[tooltipItem.dataIndex];
            return `Task ${label}: ${value / reportData.totalTask}`;
          },
        },
      },
    },
  };

  const barData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Task Priority",
        data: [
          reportData.lowCount,
          reportData.mediumCount,
          reportData.highCount,
        ],
        backgroundColor: ["#53FF16", "#3F8EFC", "#E14141"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // const label = barData.labels[tooltipItem.dataIndex];
            const value = barData.datasets[0].data[tooltipItem.dataIndex];
            return `Count: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        title: {
          display: true,
          text: "Number of Tasks",
          font: {
            size: 10,
            weight: "regular",
          },
          color: "#333",
        },
      },
    },
  };

  const today = new Date();
  const taskLabels = reportData.task.map((t) => t.taskTitle);
  const progressData = reportData.task.map((t) => t.progress);
  const deadlineData = reportData.task.map((t) =>
    differenceInDays(parse(t.deadline, "dd MMMM yyyy", new Date()), today)
  );

  const taskBarData = {
    labels: taskLabels,
    datasets: [
      {
        label: "Progress",
        data: progressData,
        backgroundColor: "#3F8EFC",
      },
      {
        label: "Days Remaining",
        data: deadlineData,
        backgroundColor: "#E14141",
      },
    ],
  };

  const taskBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel =
              taskBarData.datasets[tooltipItem.datasetIndex].label;
            const value =
              taskBarData.datasets[tooltipItem.datasetIndex].data[
                tooltipItem.dataIndex
              ];
            // const taskLabel = taskBarData.labels[tooltipItem.dataIndex];

            let message = "";

            if (datasetLabel === "Progress") {
              message = `Progress: ${value}%`;
            } else if (datasetLabel === "Days Remaining") {
              message = `Days Remaining: ${value}`;
            }

            return message;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("project");
  return (
    <Row gap="5rem">
      <HeadBtn>
        <Heading>{projectName}</Heading>

        <Button
          variation="secondary"
          size="medium"
          onClick={() => onGeneratePdf()}
        >
          Download report
        </Button>
      </HeadBtn>
      <Container ref={containerRef}>
        <Container1 style={{ height: "400px" }}>
          <p>
            The percentage of tasks that are completed, pending and in-progress
          </p>
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <DoughnutLegend>
            <DLI>
              <span style={{ backgroundColor: "#53FF16" }}></span>
              <div>
                {(reportData.completed / reportData.totalTask) * 100}% completed
              </div>
            </DLI>
            <DLI>
              <span style={{ backgroundColor: "#3F8EFC" }}></span>
              <div>
                {(reportData["in-progress"] / reportData.totalTask) * 100}%
                progress
              </div>
            </DLI>
            <DLI>
              <span style={{ backgroundColor: "#E14141" }}></span>
              <div>
                {(reportData.pending / reportData.totalTask) * 100}% pending
              </div>
            </DLI>
          </DoughnutLegend>
        </Container1>
        <Container1 style={{ height: "400px" }}>
          <p>Distribution of tasks by there priority.</p>
          <Bar data={barData} options={barOptions} />
        </Container1>
        <Container1 style={{ height: "400px", paddingBottom: "4rem" }}>
          <p>Task Progress and Deadlines</p>
          <Bar data={taskBarData} options={taskBarOptions} />
        </Container1>
      </Container>
    </Row>
  );
}

const generatePdf = (project = {}, charts = "") => {
  const doc = new jsPDF();
  const margin = 10;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const fontSize = 12;

  // Title
  doc.setFontSize(20);
  doc.text("Project Summary", pageWidth / 2, margin, { align: "center" });

  // let yPosition = margin+20;

  // Project Details
  doc.setFontSize(fontSize);
  let yPosition = margin + 20; // Starting position below the title

  doc.addImage(
    "/images/logo.png",
    "PNG",
    180,
    yPosition - 10,
    10,
    10,
    "logo",
    "FAST"
  );

  // Project Name
  doc.setFont("helvetica", "bold");
  doc.text("Project Name:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(project.title, margin + 30, yPosition);

  yPosition += 10;

  // Manager
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0); // Reset color to black
  doc.text("Manager:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#3F8EFC");
  doc.text(project.manager, margin + 25, yPosition);

  yPosition += 10;

  // Deadline
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#F8202D");
  doc.text("Deadline:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0); // Reset color to black
  doc.text(project.deadline, margin + 25, yPosition);

  yPosition += 10;

  // Description
  doc.setFont("helvetica", "bold");
  doc.text("Description:", margin, yPosition);
  doc.setFont("helvetica", "normal");

  // Handle long description
  const descriptionLines = doc.splitTextToSize(
    project.description,
    pageWidth - 5 * margin
  );

  descriptionLines.forEach((line, index) => {
    if (yPosition + 10 > doc.internal.pageSize.height - margin) {
      doc.addPage();
      yPosition = margin;
    }

    doc.text(line, margin + 27, yPosition);

    yPosition += 5;
  });

  yPosition += 10;

  // Progress Bar
  const progress = project.progress;
  if (yPosition + 20 > doc.internal.pageSize.height - margin) {
    doc.addPage();
    yPosition = margin;
  }

  // doc.text(`Project Progress: ${progress}%`, margin, yPosition);

  doc.setFont("helvetica", "bold");
  doc.text("Project Progress: ", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(`${progress}%`, margin + 38, yPosition);

  doc.setFillColor(227, 233, 255);
  doc.roundedRect(margin, yPosition + 5, pageWidth - 2 * margin, 2, 2, 2, "F"); // Progress bar background
  doc.setFillColor(63, 142, 252);
  doc.roundedRect(
    margin,
    yPosition + 5,
    (pageWidth - 2 * margin) * (progress / 100),
    2,
    2,
    2,
    "F"
  );
  yPosition += 20;

  // Task Table
  if (yPosition + 10 > doc.internal.pageSize.height - margin) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "bold");
  doc.text("All Tasks", margin, yPosition);
  yPosition += 10;

  const tableData = project.tasks.map((task, index) => [
    index + 1, // Serial Number
    task.title,
    task.deadline,
    `${task.progress}%`,
    task.members.map((member) => member.email).join(", "),
  ]);

  doc.autoTable({
    startY: yPosition,
    head: [
      ["S.No", "Task Name", "Deadline", "Task Progress", "Task Member Emails"],
    ],
    body: tableData,
    theme: "grid",
    // margin: { top: yPosition },
    didDrawPage: function (data) {
      if (data.settings.startY + data.table.height > pageHeight - margin) {
        doc.addPage();
        data.settings.startY = margin;
      }
    },
  });

  // Add Chart Image
  if (charts) {
    doc.addPage(); // Add a new page for the chart

    const img = new Image();
    img.src = charts;

    img.onload = function () {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const maxWidth = pageWidth - 2 * margin;
      const maxHeight = pageHeight - 2 * margin;

      // Calculate scaling factor while maintaining aspect ratio
      let width = maxWidth;
      let height = (imgHeight * maxWidth) / imgWidth;

      if (height > maxHeight) {
        height = maxHeight;
        width = (imgWidth * maxHeight) / imgHeight;
      }

      // Check if the image fits within the page
      const chartX = (pageWidth - width) / 2;
      const chartY = margin; // Start from the top of the page

      doc.addImage(charts, "PNG", chartX, chartY, width, height);
      doc.save(`Project_Summary_${project.id}.pdf`);
    };
  } else {
    doc.save(`Project_Summary_${project.id}.pdf`);
  }
};

export default Analytics;
