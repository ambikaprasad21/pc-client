import { useForm } from "react-hook-form";
import { FaUserTie } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";

function AddMember() {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    console.log(errors);
  }

  function onError(errors) {
    console.log(errors);
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
        <FaUserTie
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
        <p style={{ color: "#7B7979" }}>Add new member</p>
        <p style={{ color: "#AFAEAE" }}>Fill member information</p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            placeholder="johndoe@gmail.com"
          />
        </Row>
        <Row>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "this field is required",
              max: {
                value: 30,
                message: "Title must be of 30 characters long",
              },
            })}
            placeholder="Frontend Engineer"
          />
        </Row>
        <Row>
          <label htmlFor="role">Role</label>
          <Input
            type="text"
            id="role"
            {...register("role", {
              required: "role is required",
              max: {
                value: 30,
                message: "role must be less than 30 characters",
              },
            })}
            placeholder="UI Designer"
          />
        </Row>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Button variation="primary" size="medium" type="reset">
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            Add member
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
