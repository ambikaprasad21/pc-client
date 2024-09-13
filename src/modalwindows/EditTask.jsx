import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "../ui/Button";
import Row from "../ui/Row";
import { FaDiceD6 } from "react-icons/fa";
import { Textarea } from "../ui/TextArea";
import Input from "../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProjectFn } from "../services/functions/projectFn";
import toast from "react-hot-toast";
import SpinnerSm from "../ui/SpinnerSm";
import { editTaskFn } from "../services/functions/taskFn";

function EditTask({ data, onCloseModal }) {
  const task = {
    ...data,
    deadline: data.deadline
      ? new Date(data.deadline).toISOString().split("T")[0]
      : "",
    priority: { value: data.priorityLevel, label: data.priorityLevel },
  };
  const { _id: taskId, ...taskValues } = task;
  const { register, handleSubmit, control } = useForm({
    defaultValues: taskValues,
  });

  const queryClient = useQueryClient();

  const { isLoading: updating, mutate } = useMutation({
    mutationKey: ["allTasks"],
    mutationFn: editTaskFn,
    onSuccess: () => {
      toast.success("Task upated successfully");
      queryClient.invalidateQueries(["allTasks"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(newData) {
    mutate({ taskId, newData });
  }

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

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
          Edit task details
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.2rem", fontWeight: "500" }}>
          Enter new details for this task
        </p>
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
        <Row>
          <label htmlFor="date">Deadline</label>
          <Input
            type="date"
            id="deadline"
            {...register("deadline")}
            placeholder="YYYY-MM-DD"
          />
        </Row>
        <Row>
          <label htmlFor="taskPriority">Priority</label>
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Task must have a priority" }}
            render={({ field }) => (
              <Select
                {...field}
                options={priorityOptions}
                value={priorityOptions.find(
                  (option) => option.value === field.value?.value
                )}
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              />
            )}
          />
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

export default EditTask;
