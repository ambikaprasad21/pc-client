import { useForm } from "react-hook-form";
import { FaFacebookMessenger } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { messageUserFn } from "../services/functions/messageFn";
import toast from "react-hot-toast";
import { Textarea } from "../ui/TextArea";
import SpinnerSm from "../ui/SpinnerSm";

function MessageMember({ onCloseModal, userId }) {
  const { register, handleSubmit } = useForm();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["message"],
    mutationFn: messageUserFn,
    onSuccess: () => {
      toast.success("Message sent");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ message: data, receiverId: userId });
  }
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
        <FaFacebookMessenger
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
          Enter message
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.4rem", fontWeight: "550" }}>
          Provide message below to send
        </p>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="message">Message</label>
          <Textarea
            type="text"
            id="message"
            {...register("message")}
            placeholder="write message here.."
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
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            {isLoading ? <SpinnerSm /> : "Send message"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MessageMember;
