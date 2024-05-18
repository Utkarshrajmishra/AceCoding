import { ref } from "firebase/database";
import { Input } from "../ui/input";
import React from "react";
interface InputProps {
  type: string;
  placeholder: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", placeholder = "Input your name" }: InputProps, ref) => {
    return <Input ref={ref} type={type} placeholder={placeholder} />;
  }
);


export default InputField;
