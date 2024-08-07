import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaFilePdf, FaImage, FaBriefcase } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

import Select from "react-select";
import styled from "styled-components";
import Button from "../ui/Button";
function CreateTask({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [fileErrors, setFileErrors] = useState({});

  // const videoFileInputRef = useRef(null);
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

  // Sample options
  const memberOptions = [
    { value: "1", label: "Alice" },
    { value: "2", label: "Bob" },
    { value: "3", label: "Charlie" },
    { value: "4", label: "Diana" },
  ];

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
        <FaBriefcase
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
        <p style={{ color: "#7B7979" }}>Create new task</p>
        <p style={{ color: "#AFAEAE" }}>Enter details for this task</p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Task title"
          />
        </Row>
        <Row>
          <label htmlFor="description">Description</label>
          <Textarea
            type="text"
            id="description"
            {...register("description")}
            placeholder="Task description"
          />
        </Row>
        <div>
          <label htmlFor="taskDeadline">Deadline</label>
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a deadline"
                {...field}
              />
            )}
          />
          {errors.deadline && <span>{errors.deadline.message}</span>}
        </div>

        <div>
          <label htmlFor="taskMembers">Members</label>
          <Controller
            name="members"
            control={control}
            rules={{ required: "At least one member must be selected" }}
            render={({ field }) => (
              <Select
                isMulti
                options={memberOptions}
                value={field.value}
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              />
            )}
          />
          {errors.members && <span>{errors.members.message}</span>}
        </div>

        <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
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

        <div>
          <Button
            variation="primary"
            size="medium"
            type="reset"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            Create task
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
