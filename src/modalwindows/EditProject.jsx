import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Row from "../ui/Row";
import { FaDiceD6 } from "react-icons/fa";
import { Textarea } from "../ui/TextArea";
import Input from "../ui/Input";

function EditProject({ onCloseModal }) {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
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
        <p style={{ color: "#7B7979" }}>Edit project details</p>
        <p style={{ color: "#AFAEAE" }}>Enter new details for this project</p>
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
            Edit project
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
