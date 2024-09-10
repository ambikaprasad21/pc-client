import styled, { css } from "styled-components";
import Row from "../ui/Row";
import Progress from "../ui/Progress";
import Calender from "../components/Calender";
import { useQuery } from "@tanstack/react-query";
import { getDashboardFn } from "../services/functions/getDashboardFn";
import SpinnerSm from "../ui/SpinnerSm";

// import Select from "react-select";

const ProgCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
`;

const Card = styled.div`
  background-color: #f7f7f7;
  width: 30rem;
  padding: 1rem 1.6rem;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  gap: 1.4rem;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const CardTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 550;
  color: #3b3b3b;
`;

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardFn,
  });
  if (isLoading) return <SpinnerSm />;
  return (
    <Row>
      <CardContainer>
        <Card>
          <CardTitle>Projects</CardTitle>
          <ProgCont>
            <div>
              <Title size="small">
                <div>Progress</div>
                <div>{`${Math.ceil(data?.overallProjectProgress)}`} %</div>
              </Title>
            </div>
            <Progress progress={`${Math.ceil(data?.overallProjectProgress)}`} />
          </ProgCont>
          <span
            style={{ color: "#636363" }}
          >{`Got ${data?.numberOfProjects} projects`}</span>
        </Card>
        <Card>
          <CardTitle>Tasks</CardTitle>
          <ProgCont>
            <div>
              <Title size="small">
                <div>Progress</div>
                <div>{`${Math.ceil(data?.overallTaskProgress)}`} %</div>
              </Title>
            </div>
            <Progress progress={`${Math.ceil(data?.overallTaskProgress)}`} />
          </ProgCont>
          <span
            style={{ color: "#636363" }}
          >{`Got ${data?.numberOfTasks} tasks`}</span>
        </Card>
      </CardContainer>
      <Calender />
    </Row>
  );
}

// function DeleteModal() {
//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#F8202D",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#FEE8EA",
//           position: "relative",
//         }}
//       >
//         <FaTrashAlt
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Are you sure, want to delete it?</p>
//         <p style={{ color: "#F8202D" }}>This action can’t be undone.</p>
//       </Row>
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <div>
//           <Button variation="primary" size="medium">
//             Cancel
//           </Button>
//           <Button
//             variation="secondary"
//             size="medium"
//             style={{ color: "#fff", backgroundColor: "#F8202D" }}
//           >
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AddMember() {
//   const { register, handleSubmit, formState } = useForm();

//   const { errors } = formState;

//   function onSubmit(data) {
//     console.log(data);
//     console.log(errors);
//   }

//   function onError(errors) {
//     console.log(errors);
//   }
//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaUserTie
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Add new member</p>
//         <p style={{ color: "#AFAEAE" }}>Fill member information</p>
//       </Row>
//       <form onSubmit={handleSubmit(onSubmit, onError)}>
//         <Row>
//           <label htmlFor="email">Email</label>
//           <Input
//             type="email"
//             id="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "invalid email address",
//               },
//             })}
//             placeholder="johndoe@gmail.com"
//           />
//         </Row>
//         <Row>
//           <label htmlFor="title">Title</label>
//           <Input
//             type="text"
//             id="title"
//             {...register("title", {
//               required: "this field is required",
//               max: {
//                 value: 30,
//                 message: "Title must be of 30 characters long",
//               },
//             })}
//             placeholder="Frontend Engineer"
//           />
//         </Row>
//         <Row>
//           <label htmlFor="role">Role</label>
//           <Input
//             type="text"
//             id="role"
//             {...register("role", {
//               required: "role is required",
//               max: {
//                 value: 30,
//                 message: "role must be less than 30 characters",
//               },
//             })}
//             placeholder="UI Designer"
//           />
//         </Row>
//         <div>
//           <Button variation="primary" size="medium" type="reset">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Add member
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function EditMember({ data }) {
//   // const { id: memberId, ...memberDetails } = data;
//   const { register, handleSubmit, formState } = useForm({
//     // defaultValues: memberDetails,
//   });

//   function onSubmit(newData) {
//     console.log(newData);
//   }

//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaUserTie
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Edit member details</p>
//         <p style={{ color: "#AFAEAE" }}>Enter new details for this member</p>
//       </Row>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Row>
//           <label htmlFor="title">Title</label>
//           <Input
//             type="text"
//             id="title"
//             {...register("title")}
//             placeholder="Frontend Engineer"
//           />
//         </Row>
//         <Row>
//           <label htmlFor="role">Role</label>
//           <Input
//             type="text"
//             id="role"
//             {...register("role")}
//             placeholder="UI Designer"
//           />
//         </Row>
//         <div>
//           <Button variation="primary" size="medium" type="reset">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Add member
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const File = styled.div`
//   cursor: pointer;
//   display: flex;
//   flex-direction: column;
//   gap: 1.4rem;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem 3.6rem;
//   border-radius: 10px;
//   border: 3px dashed #ccc;
//   /* border-width: 5px; */
//   svg {
//     color: #3f8efc;
//   }
//   p {
//     font-size: 1.2rem;
//   }
// `;

// function CreateProject() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const [fileErrors, setFileErrors] = useState({});

//   const videoFileInputRef = useRef(null);
//   const pdfFileInputRef = useRef(null);
//   const imageFileInputRef = useRef(null);

//   const handleFileInputClick = (inputRef) => {
//     inputRef.current.click();
//   };

//   const validateFileType = (file, acceptedTypes) => {
//     if (!file) return true; // No file selected, no validation needed
//     return acceptedTypes.includes(file.type);
//   };

//   const handleFileChange = (event, inputName, acceptedTypes) => {
//     const file = event.target.files[0];
//     if (validateFileType(file, acceptedTypes)) {
//       setValue(inputName, file);
//       setFileErrors((prev) => ({ ...prev, [inputName]: false }));
//     } else {
//       setValue(inputName, null);
//       setFileErrors((prev) => ({ ...prev, [inputName]: true }));
//     }
//   };

//   function onSubmit(newData) {
//     console.log(newData);
//   }

//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaDiceD6
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Create new project</p>
//         <p style={{ color: "#AFAEAE" }}>Enter details for this project</p>
//       </Row>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Row>
//           <label htmlFor="title">Title</label>
//           <Input
//             type="text"
//             id="title"
//             {...register("title")}
//             placeholder="Project title"
//           />
//         </Row>
//         <Row>
//           <label htmlFor="description">Description</label>
//           <Textarea
//             type="text"
//             id="description"
//             {...register("description")}
//             placeholder="Project description"
//           />
//         </Row>

//         <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
//           <div>
//             <input
//               type="file"
//               accept="video/*"
//               ref={videoFileInputRef}
//               id="videofile"
//               style={{ display: "none" }}
//               onChange={(e) =>
//                 handleFileChange(e, "videofile", [
//                   "video/mp4",
//                   "video/avi",
//                   "video/webm",
//                   "video/mpg",
//                 ])
//               }
//             />

//             <File onClick={() => handleFileInputClick(videoFileInputRef)}>
//               <FaVideo size={"5rem"} />
//               <p>Upload video</p>
//             </File>
//             {fileErrors.videofile && (
//               <p style={{ color: "red" }}>
//                 Invalid video file type. Please upload a valid video file.
//               </p>
//             )}
//           </div>
//           <div>
//             <input
//               type="file"
//               accept="application/pdf"
//               ref={pdfFileInputRef}
//               id="pdffile"
//               style={{ display: "none" }}
//               onChange={(e) =>
//                 handleFileChange(e, "pdffile", ["application/pdf"])
//               }
//             />

//             <File onClick={() => handleFileInputClick(pdfFileInputRef)}>
//               <FaFilePdf size={"5rem"} />
//               <p>Upload pdf</p>
//             </File>
//             {fileErrors.pdffile && (
//               <p style={{ color: "red" }}>
//                 Invalid PDF file type. Please upload a valid PDF file.
//               </p>
//             )}
//           </div>
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               ref={imageFileInputRef}
//               id="imagefile"
//               style={{ display: "none" }}
//               onChange={(e) =>
//                 handleFileChange(e, "imagefile", [
//                   "image/jpeg",
//                   "image/png",
//                   "image/gif",
//                 ])
//               }
//             />

//             <File onClick={() => handleFileInputClick(imageFileInputRef)}>
//               <FaImage size={"5rem"} />
//               <p>Upload image</p>
//             </File>
//             {fileErrors.imagefile && (
//               <p style={{ color: "red" }}>
//                 Invalid image file type. Please upload a valid image file.
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <Button variation="primary" size="medium" type="reset">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Create project
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function EditProject() {
//   const { register, handleSubmit } = useForm();

//   function onSubmit(data) {
//     console.log(data);
//   }

//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaDiceD6
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Edit project details</p>
//         <p style={{ color: "#AFAEAE" }}>Enter new details for this project</p>
//       </Row>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Row>
//           <label htmlFor="title">Title</label>
//           <Input
//             type="text"
//             id="title"
//             {...register("title")}
//             placeholder="Project title"
//           />
//         </Row>
//         <Row>
//           <label htmlFor="description">Description</label>
//           <Textarea
//             type="text"
//             id="description"
//             {...register("description")}
//             placeholder="Project description"
//           />
//         </Row>

//         <div>
//           <Button variation="primary" size="medium" type="reset">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Edit project
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function UploadFile({ fileType }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const [fileErrors, setFileErrors] = useState({});

//   const fileInputRef = useRef(null);

//   const handleFileInputClick = () => {
//     fileInputRef.current.click();
//   };

//   const validateFileType = (file) => {
//     if (!file) return true; // No file selected, no validation needed

//     return [...fileType].includes(file.type);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (validateFileType(file)) {
//       setValue(fileType, file);
//       setFileErrors((prev) => ({ ...prev, [fileType]: false }));
//     } else {
//       setValue(fileType, null);
//       setFileErrors((prev) => ({ ...prev, [fileType]: true }));
//     }
//   };

//   function onSubmit(newData) {
//     console.log(newData);
//   }

//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaFileUpload
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Upload a file</p>
//         <p style={{ color: "#AFAEAE" }}>Attach image or pdf file below</p>
//       </Row>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
//           <div>
//             <input
//               type="file"
//               accept={`${fileType}/*`}
//               ref={fileInputRef}
//               id="file"
//               style={{ display: "none" }}
//               onChange={(e) => handleFileChange(e)}
//             />

//             <File onClick={handleFileInputClick}>
//               <FaCloudUploadAlt size={"5rem"} />
//               <p>Click here to select a file</p>
//             </File>
//             {fileErrors.file && (
//               <p style={{ color: "red" }}>
//                 Invalid file type. Please upload a valid file.
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <Button variation="primary" size="medium" type="reset">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Upload
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function CreateTask() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const [fileErrors, setFileErrors] = useState({});

//   // const videoFileInputRef = useRef(null);
//   const pdfFileInputRef = useRef(null);
//   const imageFileInputRef = useRef(null);

//   const handleFileInputClick = (inputRef) => {
//     inputRef.current.click();
//   };

//   const validateFileType = (file, acceptedTypes) => {
//     if (!file) return true; // No file selected, no validation needed
//     return acceptedTypes.includes(file.type);
//   };

//   const handleFileChange = (event, inputName, acceptedTypes) => {
//     const file = event.target.files[0];
//     if (validateFileType(file, acceptedTypes)) {
//       setValue(inputName, file);
//       setFileErrors((prev) => ({ ...prev, [inputName]: false }));
//     } else {
//       setValue(inputName, null);
//       setFileErrors((prev) => ({ ...prev, [inputName]: true }));
//     }
//   };

//   function onSubmit(newData) {
//     console.log(newData);
//   }

//   // Sample options
//   const memberOptions = [
//     { value: "1", label: "Alice" },
//     { value: "2", label: "Bob" },
//     { value: "3", label: "Charlie" },
//     { value: "4", label: "Diana" },
//   ];

//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaBriefcase
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Create new task</p>
//         <p style={{ color: "#AFAEAE" }}>Enter details for this task</p>
//       </Row>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Row>
//           <label htmlFor="title">Title</label>
//           <Input
//             type="text"
//             id="title"
//             {...register("title")}
//             placeholder="Task title"
//           />
//         </Row>
//         <Row>
//           <label htmlFor="description">Description</label>
//           <Textarea
//             type="text"
//             id="description"
//             {...register("description")}
//             placeholder="Task description"
//           />
//         </Row>
//         <div>
//           <label htmlFor="taskDeadline">Deadline</label>
//           <Controller
//             name="deadline"
//             control={control}
//             rules={{ required: "Deadline is required" }}
//             render={({ field }) => (
//               <DatePicker
//                 selected={field.value}
//                 onChange={(date) => field.onChange(date)}
//                 dateFormat="yyyy/MM/dd"
//                 placeholderText="Select a deadline"
//                 {...field}
//               />
//             )}
//           />
//           {errors.deadline && <span>{errors.deadline.message}</span>}
//         </div>

//         <div>
//           <label htmlFor="taskMembers">Members</label>
//           <Controller
//             name="members"
//             control={control}
//             rules={{ required: "At least one member must be selected" }}
//             render={({ field }) => (
//               <Select
//                 isMulti
//                 options={memberOptions}
//                 value={field.value}
//                 onChange={(selectedOptions) => field.onChange(selectedOptions)}
//                 getOptionValue={(option) => option.value}
//                 getOptionLabel={(option) => option.label}
//               />
//             )}
//           />
//           {errors.members && <span>{errors.members.message}</span>}
//         </div>

//         <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
//           <div>
//             <input
//               type="file"
//               accept="application/pdf"
//               ref={pdfFileInputRef}
//               id="pdffile"
//               style={{ display: "none" }}
//               onChange={(e) =>
//                 handleFileChange(e, "pdffile", ["application/pdf"])
//               }
//             />

//             <File onClick={() => handleFileInputClick(pdfFileInputRef)}>
//               <FaFilePdf size={"5rem"} />
//               <p>Upload pdf</p>
//             </File>
//             {fileErrors.pdffile && (
//               <p style={{ color: "red" }}>
//                 Invalid PDF file type. Please upload a valid PDF file.
//               </p>
//             )}
//           </div>
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               ref={imageFileInputRef}
//               id="imagefile"
//               style={{ display: "none" }}
//               onChange={(e) =>
//                 handleFileChange(e, "imagefile", [
//                   "image/jpeg",
//                   "image/png",
//                   "image/gif",
//                 ])
//               }
//             />

//             <File onClick={() => handleFileInputClick(imageFileInputRef)}>
//               <FaImage size={"5rem"} />
//               <p>Upload image</p>
//             </File>
//             {fileErrors.imagefile && (
//               <p style={{ color: "red" }}>
//                 Invalid image file type. Please upload a valid image file.
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <Button variation="primary" size="medium" type="reset">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Create task
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function MessageMember() {
//   const { register, handleSubmit } = useForm();

//   function onSubmit(data) {
//     console.log(data);
//   }
//   return (
//     <div
//       style={{
//         padding: "0 2rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         gap: "2.4rem",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: "1rem",
//           height: "1rem",
//           color: "#3F8EFC",
//           padding: "1.4rem",
//           borderRadius: "50%",
//           backgroundColor: "#E3E9FF",
//           position: "relative",
//         }}
//       >
//         <FaFacebookMessenger
//           size={"1.4rem"}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       <Row>
//         <p style={{ color: "#7B7979" }}>Enter message</p>
//         <p style={{ color: "#AFAEAE" }}>Provide message below to send</p>
//       </Row>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Row>
//           <label htmlFor="message">Message</label>
//           <Input
//             type="text"
//             id="message"
//             {...register("message")}
//             placeholder="Message"
//           />
//         </Row>
//       </form>

//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <div>
//           <Button variation="primary" size="medium">
//             Cancel
//           </Button>
//           <Button variation="secondary" size="medium">
//             Send message
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Dashboard;
