import { useForm } from "react-hook-form";
import { FaUserTie } from "react-icons/fa";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMemberFn } from "../services/functions/memberFn";
import toast from "react-hot-toast";
import SpinnerSm from "../ui/SpinnerSm";
import styled from "styled-components";

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

function EditMember({ data, onCloseModal }) {
  const { id: memberId, ...memberDetails } = data;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: memberDetails,
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["members"],
    mutationFn: editMemberFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      toast.success("Member updated successfully.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(newData) {
    console.log(newData, memberId);
    mutate(newData);
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
        <FaUserTie
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
          Edit member details
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.2rem", fontWeight: "500" }}>
          Enter new details for this member
        </p>
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
          {errors?.title?.message && <Error>{errors.title.message}</Error>}
        </Row>
        <Row>
          <label htmlFor="role">Role</label>
          <Input
            type="text"
            id="role"
            {...register("role")}
            placeholder="UI Designer"
          />
          {errors?.role?.message && <Error>{errors.role.message}</Error>}
        </Row>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Button
            variation="primary"
            size="medium"
            type="reset"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            {isLoading ? <SpinnerSm /> : "Edit member"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditMember;
