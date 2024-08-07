import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiceD6, FaVideo, FaFilePdf, FaImage } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import styled from "styled-components";
import Button from "../ui/Button";

const File = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  justify-content: center;
  align-items: center;
  padding: 2rem 3.6rem;
  border-radius: 10px;
  border: 3px dashed #ccc;
  /* border-width: 5px; */
  svg {
    color: #3f8efc;
  }
  p {
    font-size: 1.2rem;
  }
`;

function CreateProject({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [fileErrors, setFileErrors] = useState({});

  const videoFileInputRef = useRef(null);
  const pdfFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);

  const handleFileInputClick = (inputRef) => {
    inputRef.current.click();
  };

  const validateFileType = (file, acceptedTypes) => {
    if (!file) return true; // No file selected, no validation needed
    return acceptedTypes.includes(file.type);
  };

  const handleFileChange = (event, inputName, acceptedTypes) => {
    const file = event.target.files[0];
    if (validateFileType(file, acceptedTypes)) {
      setValue(inputName, file);
      setFileErrors((prev) => ({ ...prev, [inputName]: false }));
    } else {
      setValue(inputName, null);
      setFileErrors((prev) => ({ ...prev, [inputName]: true }));
    }
  };

  function onSubmit(newData) {
    console.log(newData);
  }

  return (
    <div
      style={{
        padding: "0 2rem",
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "2.4rem",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: "1rem",
          height: "1rem",
          color: "#3F8EFC",
          padding: "1.4rem",
          borderRadius: "50%",
          backgroundColor: "#E3E9FF",
          position: "relative",
        }}
      >
        <FaDiceD6
          size={"1.4rem"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <Row>
        <p style={{ color: "#7B7979" }}>Create new project</p>
        <p style={{ color: "#AFAEAE" }}>Enter details for this project</p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Project title"
          />
        </Row>
        <Row>
          <label htmlFor="description">Description</label>
          <Textarea
            type="text"
            id="description"
            {...register("description")}
            placeholder="Project description"
          />
        </Row>

        <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
          <div>
            <input
              type="file"
              accept="video/*"
              ref={videoFileInputRef}
              id="videofile"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, "videofile", [
                  "video/mp4",
                  "video/avi",
                  "video/webm",
                  "video/mpg",
                ])
              }
            />

            <File onClick={() => handleFileInputClick(videoFileInputRef)}>
              <FaVideo size={"5rem"} />
              <p>Upload video</p>
            </File>
            {fileErrors.videofile && (
              <p style={{ color: "red" }}>
                Invalid video file type. Please upload a valid video file.
              </p>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="application/pdf"
              ref={pdfFileInputRef}
              id="pdffile"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, "pdffile", ["application/pdf"])
              }
            />

            <File onClick={() => handleFileInputClick(pdfFileInputRef)}>
              <FaFilePdf size={"5rem"} />
              <p>Upload pdf</p>
            </File>
            {fileErrors.pdffile && (
              <p style={{ color: "red" }}>
                Invalid PDF file type. Please upload a valid PDF file.
              </p>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              ref={imageFileInputRef}
              id="imagefile"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, "imagefile", [
                  "image/jpeg",
                  "image/png",
                  "image/gif",
                ])
              }
            />

            <File onClick={() => handleFileInputClick(imageFileInputRef)}>
              <FaImage size={"5rem"} />
              <p>Upload image</p>
            </File>
            {fileErrors.imagefile && (
              <p style={{ color: "red" }}>
                Invalid image file type. Please upload a valid image file.
              </p>
            )}
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Button
            variation="primary"
            size="medium"
            type="reset"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            Create project
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
