import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],

  ["link"],
];

const module = {
  toolbar: toolbarOptions,
};

function Editor({ text, setText, textareaplaceholder = "" }) {
  const quillStyle = {
    height: "70%",
  };

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={text}
      onChange={setText}
      style={quillStyle}
      placeholder={textareaplaceholder}
    />
  );
}

export default Editor;
