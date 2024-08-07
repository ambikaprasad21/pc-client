import { useRef, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import Button from "./Button";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  padding: 2rem 4rem;
  max-width: 30rem;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

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

function ChangePP({ onCloseModal }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // const files = event.target.files;
    setFile(event.target.files);
  };

  function handleUpload() {
    console.log(file);
  }
  return (
    <StyledDiv>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <File onClick={handleFileInputClick}>
        <BsCardImage size={"5rem"} />
        <p>Click here to select image</p>
      </File>

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
          Submit
        </Button>
      </div>
    </StyledDiv>
  );
}

export default ChangePP;
