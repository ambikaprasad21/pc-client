import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Row from "../ui/Row";

import { FaFileUpload, FaCloudUploadAlt } from "react-icons/fa";
import styled from "styled-components";
import Button from "../ui/Button";

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

function UploadFile({ fileType, onCloseModal }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [fileErrors, setFileErrors] = useState({});

  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const validateFileType = (file) => {
    if (!file) return true; // No file selected, no validation needed

    return [...fileType].includes(file.type);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (validateFileType(file)) {
      setValue(fileType, file);
      setFileErrors((prev) => ({ ...prev, [fileType]: false }));
    } else {
      setValue(fileType, null);
      setFileErrors((prev) => ({ ...prev, [fileType]: true }));
    }
  };

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
        <FaFileUpload
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
        <p style={{ color: "#7B7979" }}>Upload a file</p>
        <p style={{ color: "#AFAEAE" }}>Attach image or pdf file below</p>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
          <div>
            <input
              type="file"
              accept={`${fileType}/*`}
              ref={fileInputRef}
              id="file"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />

            <File onClick={handleFileInputClick}>
              <FaCloudUploadAlt size={"5rem"} />
              <p>Click here to select a file</p>
            </File>
            {fileErrors.file && (
              <p style={{ color: "red" }}>
                Invalid file type. Please upload a valid file.
              </p>
            )}
          </div>
        </div>

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
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadFile;
