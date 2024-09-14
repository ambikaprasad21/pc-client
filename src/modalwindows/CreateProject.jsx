import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiceD6, FaVideo, FaFilePdf, FaImage } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import styled from "styled-components";
import Button from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectFn } from "../services/functions/projectFn";
import toast from "react-hot-toast";
import SpinnerSm from "../ui/SpinnerSm";

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

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
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["projects"],
    mutationFn: createProjectFn,
    onSuccess: () => {
      toast.success("Project created successfully.");
      queryClient.invalidateQueries(["projects"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

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
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("description", newData.description);
    formData.append("deadline", newData.deadline);

    if (newData.videofile) {
      formData.append("video", newData.videofile);
    }
    if (newData.imagefile) {
      formData.append("image", newData.imagefile);
    }
    if (newData.pdffile) {
      formData.append("pdf", newData.pdffile);
    }
    mutate(formData);
  }

  return (
    <div
      style={{
        // padding: "0 2rem",
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "2.4rem",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: "2rem",
          height: "2rem",
          color: "#3F8EFC",
          padding: "2rem",
          borderRadius: "50%",
          backgroundColor: "#E3E9FF",
          position: "relative",
        }}
      >
        <FaDiceD6
          size={"2rem"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <Row>
        <p style={{ color: "#7B7979", fontSize: "1.4rem", fontWeight: "550" }}>
          Create new project
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.2rem", fontWeight: "500" }}>
          Enter details for this project
        </p>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "This field is required.",
              max: {
                value: 30,
                message: "Title must be of 30 characters long",
              },
            })}
            placeholder="Project title"
          />
          {errors?.title?.message && <Error>{errors.title.message}</Error>}
        </Row>
        <Row>
          <label htmlFor="description">Description</label>
          <Textarea
            type="text"
            id="description"
            {...register("description", { required: "This field is required" })}
            placeholder="Project description"
          />
          {errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )}
        </Row>

        <Row>
          <label htmlFor="date">Deadline</label>
          <Input
            type="date"
            id="deadline"
            {...register("deadline", { required: "This field is required." })}
            placeholder="YYYY-MM-DD"
          />
          {errors?.deadline?.message && (
            <Error>{errors.deadline.message}</Error>
          )}
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
            {isLoading ? <SpinnerSm /> : "Create project"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
