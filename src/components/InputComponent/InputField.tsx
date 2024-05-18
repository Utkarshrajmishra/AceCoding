import { Input } from "../ui/input";
import React from "react";
interface InputProps {
  type: string;
  placeholder: string;
  name:string,
  ref?:React.Ref<HTMLInputElement>
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {type,placeholder,name,...rest}=props;
    return <Input ref={ref} type={type} placeholder={placeholder} {...rest} name={name}/>;
  }
);


export default InputField;
