import { FaTrashAlt } from "react-icons/fa";
import Row from "../ui/Row";
import Button from "../ui/Button";

function ConfirmDelete() {
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
          color: "#F8202D",
          padding: "1.4rem",
          borderRadius: "50%",
          backgroundColor: "#FEE8EA",
          position: "relative",
        }}
      >
        <FaTrashAlt
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
        <p style={{ color: "#7B7979" }}>Are you sure, want to delete it?</p>
        <p style={{ color: "#F8202D" }}>This action can’t be undone.</p>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <Button variation="primary" size="medium">
            Cancel
          </Button>
          <Button
            variation="secondary"
            size="medium"
            style={{ color: "#fff", backgroundColor: "#F8202D" }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
