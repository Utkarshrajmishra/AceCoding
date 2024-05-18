import { useRef } from "react";
import InputField from "../InputComponent/InputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  type: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type = "Login",
}: AuthFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    const name = type === "Signup" ? nameRef.current?.value ?? "" : "";
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
 
  };

  

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{type}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[380px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {type} to your Account
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {type === "Signup" ? (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <InputField
                  type="name"
                  ref={nameRef}
                  placeholder="Input your name"
                />
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-left">
                Email
              </Label>
              <InputField
                type="email"
                ref={emailRef}
                placeholder="Input your email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-left">
                Password
              </Label>
              <InputField
                type="password"
                ref={passwordRef}
                placeholder="Input your password"
              />
            </div>
          </div>

          <Button type="submit" onClick={handleSubmit}>
            {type}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthForm;
