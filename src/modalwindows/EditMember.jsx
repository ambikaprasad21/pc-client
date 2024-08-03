import { useForm } from "react-hook-form";
import { FaUserTie } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
function EditMember({ data }) {
  // const { id: memberId, ...memberDetails } = data;
  const { register, handleSubmit, formState } = useForm({
    // defaultValues: memberDetails,
  });

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
        <p style={{ color: "#7B7979" }}>Edit member details</p>
        <p style={{ color: "#AFAEAE" }}>Enter new details for this member</p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Frontend Engineer"
          />
        </Row>
        <Row>
          <label htmlFor="role">Role</label>
          <Input
            type="text"
            id="role"
            {...register("role")}
            placeholder="UI Designer"
          />
        </Row>
        <div>
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

export default EditMember;
