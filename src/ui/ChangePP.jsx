import { useRef, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import Button from "./Button";
import styled from "styled-components";
import { uploadPPApi } from "../services/api/api";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import SpinnerSm from "./SpinnerSm";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  /* align-items: flex-end; */
  gap: 3rem;
  padding: 2rem 0;
  width: 30rem;
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
  /* align-self: center; */
  padding: 2rem 0;
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

const StyledBtn = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
`;

function ChangePP({ onCloseModal }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { prozVerify } = useUser();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // const files = event.target.files;
    setFile(event.target.files);
    console.log(event.target.files);
  };

  function handleUpload() {
    console.log("upload picture");
    const formData = new FormData();
    formData.append("profile-pic", file[0]);
    setLoading(true);
    uploadPPApi(formData, prozVerify)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Profile picture uploaded successfully.");
          window.location.reload(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Upload different image");
      })
      .finally(() => {
        onCloseModal();
        setLoading(false);
      });
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
        <p>{file && file[0] && file[0].name}</p>
      </File>

      <StyledBtn>
        <Button
          variation="primary"
          size="medium"
          type="reset"
          onClick={() => onCloseModal()}
        >
          Cancel
        </Button>
        <Button variation="secondary" size="medium" onClick={handleUpload}>
          {loading ? <SpinnerSm /> : "Submit"}
        </Button>
      </StyledBtn>
    </StyledDiv>
  );
}

export default ChangePP;
