import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Row from "../ui/Row";

import { FaFileUpload, FaCloudUploadAlt } from "react-icons/fa";
import styled from "styled-components";
import Button from "../ui/Button";
import SpinnerSm from "../ui/SpinnerSm";
import toast from "react-hot-toast";

const File = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  justify-content: center;
  align-items: center;
  padding: 2rem 3.6rem;
  border-radius: 10px;
  border: 3px dashed #ccc;
  /* border-width: 5px; */
  svg {
    color: #3f8efc;
  }
  p {
    font-size: 1.2rem;
  }
`;

function UploadFile({ fileType, onCloseModal, id, isLoading, mutationFn }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [fileErrors, setFileErrors] = useState({});
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const fileTypes = {
    image: ["image/jpeg", "image/png", "image/gif"],
    pdf: ["application/pdf"],
  };
  const acceptTypes = fileType === "image" ? "image/*" : "application/pdf";

  const validateFileType = (file) => {
    if (!file) return true;

    return fileTypes[fileType].includes(file.type);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (validateFileType(file)) {
      setValue("file", file);
      setFileErrors((prev) => ({ ...prev, [fileType]: false }));
      setSelectedFileName(file.name);
    } else {
      toast.error("Invalid file type.");
      setValue("file", null);
      setFileErrors((prev) => ({ ...prev, [fileType]: true }));
      setSelectedFileName("");
    }
  };

  function onSubmit(newData) {
    console.log(newData, id);
    if (newData.file === null) return;
    const formData = new FormData();
    if (newData.file) {
      formData.append(fileType, newData.file);
    }
    mutationFn({ id, formData });
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
        <FaFileUpload
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
          Upload a file
        </p>
        <p style={{ color: "#AFAEAE", fontSize: "1.2rem", fontWeight: "500" }}>
          Attach image or pdf file below
        </p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
          <div>
            <input
              type="file"
              accept={acceptTypes}
              ref={fileInputRef}
              id="file"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />

            <File onClick={handleFileInputClick}>
              <FaCloudUploadAlt size={"5rem"} />
              {selectedFileName ? (
                <p>{selectedFileName}</p>
              ) : (
                <p>Click here to select a {fileType} file</p>
              )}
            </File>
            {fileErrors.file && (
              <p style={{ color: "red" }}>
                Invalid file type. Please upload a valid file.
              </p>
            )}
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
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
            {isLoading ? <SpinnerSm /> : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadFile;
