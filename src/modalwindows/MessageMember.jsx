import { useForm } from "react-hook-form";
import { FaFacebookMessenger } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";

function MessageMember() {
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
        <FaFacebookMessenger
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
        <p style={{ color: "#7B7979" }}>Enter message</p>
        <p style={{ color: "#AFAEAE" }}>Provide message below to send</p>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="message">Message</label>
          <Input
            type="text"
            id="message"
            {...register("message")}
            placeholder="Message"
          />
        </Row>
      </form>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <Button variation="primary" size="medium">
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            Send message
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageMember;
