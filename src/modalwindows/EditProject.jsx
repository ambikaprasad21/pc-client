import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Row from "../ui/Row";
import { FaDiceD6 } from "react-icons/fa";
import { Textarea } from "../ui/TextArea";
import Input from "../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProjectFn } from "../services/functions/projectFn";
import toast from "react-hot-toast";
import SpinnerSm from "../ui/SpinnerSm";
import styled from "styled-components";

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

function EditProject({ data, onCloseModal }) {
  const project = {
    ...data,
    deadline: data.deadline
      ? new Date(data.deadline).toISOString().split("T")[0]
      : "",
  };
  const { id: projectId, ...projectValues } = project;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: projectValues,
  });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: updating, mutate } = useMutation({
    mutationKey: ["projects"],
    mutationFn: editProjectFn,
    onSuccess: () => {
      toast.success("Project upated successfully");
      queryClient.invalidateQueries(["projects"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(newData) {
    mutate({ projectId, newData });
  }

  return (
    <div
      style={{
        // padding: "0 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2.4rem",
        justifyContent: "flex-start",
        width: "40rem",
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
          Edit project details
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.2rem", fontWeight: "500" }}>
          Enter new details for this project
        </p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            {...register("title", { required: "This field is required." })}
            placeholder="Project title"
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

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
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
            {updating ? <SpinnerSm /> : "Edit project"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
