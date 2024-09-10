import { FaTrashAlt } from "react-icons/fa";
import Row from "../ui/Row";
import Button from "../ui/Button";
import SpinnerSm from "../ui/SpinnerSm";

function ConfirmDelete({ onCloseModal, isDeleting, onConfirmDelete }) {
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
          width: "2rem",
          height: "2rem",
          color: "#F8202D",
          padding: "2rem",
          borderRadius: "50%",
          backgroundColor: "#FEE8EA",
          position: "relative",
        }}
      >
        <FaTrashAlt
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
          Are you sure, want to delete it?
        </p>
        <p style={{ color: "#F8202D", fontSize: "1.2rem", fontWeight: "500" }}>
          This action can’t be undone.
        </p>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variation="primary"
            size="medium"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button
            variation="secondary"
            size="medium"
            style={{ color: "#fff", backgroundColor: "#F8202D" }}
            onClick={onConfirmDelete}
          >
            {isDeleting ? <SpinnerSm /> : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
