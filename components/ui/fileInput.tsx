import React from "react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FileInput: React.FC<FileInputProps> = (props) => {
  return <input type="file" {...props} />;
};

export default FileInput;
