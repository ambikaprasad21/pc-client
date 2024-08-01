// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export default (project = {}, charts = "") => {
//   const doc = new jsPDF();
//   const margin = 10;
//   const pageWidth = doc.internal.pageSize.width;
//   const fontSize = 12;

//   // Title
//   doc.setFontSize(20);
//   doc.text("Project Summary", pageWidth / 2, margin, { align: "center" });

//   // let yPosition = margin+20;

//   // Project Details
//   doc.setFontSize(fontSize);
//   let yPosition = margin + 20; // Starting position below the title

//   // doc.addImage(
//   //   "/images/logo.png",
//   //   "PNG",
//   //   180,
//   //   yPosition - 10,
//   //   10,
//   //   10,
//   //   "logo",
//   //   "FAST"
//   // );

//   // Project Name
//   doc.setFont("helvetica", "bold");
//   doc.text("Project Name:", margin, yPosition);
//   doc.setFont("helvetica", "normal");
//   doc.text(project.title, margin + 30, yPosition);

//   yPosition += 10;

//   // Manager
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(0, 0, 0); // Reset color to black
//   doc.text("Manager:", margin, yPosition);
//   doc.setFont("helvetica", "normal");
//   doc.setTextColor("#3F8EFC");
//   doc.text(project.manager, margin + 25, yPosition);

//   yPosition += 10;

//   // Deadline
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor("#F8202D");
//   doc.text("Deadline:", margin, yPosition);
//   doc.setFont("helvetica", "normal");
//   doc.setTextColor(0, 0, 0); // Reset color to black
//   doc.text(project.deadline, margin + 25, yPosition);

//   yPosition += 10;

//   // Description
//   doc.setFont("helvetica", "bold");
//   doc.text("Description:", margin, yPosition);
//   doc.setFont("helvetica", "normal");

//   // Handle long description
//   const descriptionLines = doc.splitTextToSize(
//     project.description,
//     pageWidth - 5 * margin
//   );

//   descriptionLines.forEach((line, index) => {
//     if (yPosition + 10 > doc.internal.pageSize.height - margin) {
//       doc.addPage();
//       yPosition = margin;
//     }

//     doc.text(line, margin + 27, yPosition);

//     yPosition += 5;
//   });

//   yPosition += 10;

//   // Progress Bar
//   const progress = project.progress;
//   if (yPosition + 20 > doc.internal.pageSize.height - margin) {
//     doc.addPage();
//     yPosition = margin;
//   }

//   // doc.text(`Project Progress: ${progress}%`, margin, yPosition);

//   doc.setFont("helvetica", "bold");
//   doc.text("Project Progress: ", margin, yPosition);
//   doc.setFont("helvetica", "normal");
//   doc.text(`${progress}%`, margin + 38, yPosition);

//   doc.setFillColor(227, 233, 255);
//   doc.roundedRect(margin, yPosition + 5, pageWidth - 2 * margin, 2, 2, 2, "F"); // Progress bar background
//   doc.setFillColor(63, 142, 252);
//   doc.roundedRect(
//     margin,
//     yPosition + 5,
//     (pageWidth - 2 * margin) * (progress / 100),
//     2,
//     2,
//     2,
//     "F"
//   );
//   yPosition += 20;

//   // // Placeholder for additional content
//   // if (yPosition + 10 > doc.internal.pageSize.height - margin) {
//   //   doc.addPage();
//   //   yPosition = margin;
//   // }
//   // doc.text("Placeholder for additional content", margin, yPosition);
//   // yPosition += 10;

//   // Include Analytics content
//   if (charts) {
//     if (yPosition + 100 > doc.internal.pageSize.height - margin) {
//       doc.addPage();
//       yPosition = margin;
//     }

//     doc.addImage(charts, "PNG", margin, yPosition, pageWidth - 2 * margin, 100);
//     yPosition += 110; // Adjust if necessary
//   }

//   // Task Table
//   if (yPosition + 10 > doc.internal.pageSize.height - margin) {
//     doc.addPage();
//     yPosition = margin;
//   }

//   doc.setFontSize(fontSize);
//   doc.setFont("helvetica", "bold");
//   doc.text("All Tasks", margin, yPosition);
//   yPosition += 10;

//   doc.autoTable({
//     startY: yPosition,
//     head: [["Task Name", "Deadline", "Task Progress", "Task Member Emails"]],
//     body: project.tasks.map((task) => [
//       task.title,
//       task.deadline,
//       `${task.progress}%`,
//       task.members.map((member) => member.email).join(", "),
//     ]),
//     theme: "grid",
//     margin: { top: yPosition },
//   });

//   // Save the PDF
//   doc.save(`Project_Summary_${project.id}.pdf`);
// };
