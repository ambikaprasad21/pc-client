import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaFilePdf, FaImage, FaBriefcase } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import styled from "styled-components";
import Button from "../ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberFn } from "../services/functions/memberFn";
import { createTaskFn } from "../services/functions/taskFn";
import toast from "react-hot-toast";
import SpinnerSm from "../ui/SpinnerSm";

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

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

function CreateTask({ onCloseModal, id }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: members } = useQuery({
    queryKey: ["members"],
    queryFn: getMemberFn,
  });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["allTasks"],
    mutationFn: createTaskFn,
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries(["allTasks"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

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
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("description", newData.description);
    formData.append("deadline", newData.deadline);
    formData.append("priorityLevel", newData.priority.value);
    newData.members.forEach((member) => {
      formData.append(`members`, member.value);
    });
    if (newData.imagefile) {
      formData.append("image", newData.imagefile);
    }
    if (newData.pdffile) {
      formData.append("pdf", newData.pdffile);
    }
    console.log(formData);
    mutate({ id, formData });
  }

  // Sample options
  // const memberOptions = [
  //   { value: "1", label: "Alice" },
  //   { value: "2", label: "Bob" },
  //   { value: "3", label: "Charlie" },
  //   { value: "4", label: "Diana" },
  // ];

  const memberOptions = members?.map((member) => {
    return {
      value: member._id,
      label: `${member.user.firstName} ${member.user.lastName}`,
    };
  });

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];
  return (
    <div
      style={{
        // padding: "0 2rem",
        width: "30rem",
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
        <FaBriefcase
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
          Create new task
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.2rem", fontWeight: "500" }}>
          Enter details for this task
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
            placeholder="Task title"
          />
          {errors?.title?.message && <Error>{errors.title.message}</Error>}
        </Row>
        <Row>
          <label htmlFor="description">Description</label>
          <Textarea
            type="text"
            id="description"
            {...register("description", {
              required: "This field is required.",
            })}
            placeholder="Task description"
          />
          {errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )}
        </Row>
        <Row>
          <label htmlFor="taskDeadline">Deadline</label>
          <Input
            type="date"
            id="deadline"
            {...register("deadline", { required: "This field is required." })}
            placeholder="YYYY-MM-DD"
          />
          {errors.deadline && <span>{errors.deadline.message}</span>}
        </Row>
        <div>
          <label htmlFor="taskPriority">Priority</label>
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Task must have a priority" }}
            render={({ field }) => (
              <Select
                options={priorityOptions}
                value={field.value}
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              />
            )}
          />
          {errors.priority && <span>{errors.priority.message}</span>}
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
            {isLoading ? <SpinnerSm /> : "Create task"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
