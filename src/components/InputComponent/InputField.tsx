import { Input } from "../ui/input";

interface InputProps {
  type: string;
  placeholder: string;
}

const InputField: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Input your name",
}: InputProps) => {
  return <Input type={type} placeholder={placeholder} />;
};

export default InputField;
