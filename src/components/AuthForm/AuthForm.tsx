import InputField from "../InputComponent/InputField";
import { Button } from "@/components/ui/button";
import { AuthSchema } from "@/zodSchema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  type: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type = "Login",
}: AuthFormProps) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const getErrorMessage = (error: any) => {
    if (error) {
      return typeof error.message === "string" ? error.message : null;
    }
    return null;
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-4">
              {type === "Signup" ? (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-left">
                    Name
                  </Label>
                  <div>
                    <InputField
                      type="name"
                      placeholder="Input your name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-red-600 text-sm">
                        {getErrorMessage(errors.name)}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-left">
                  Email
                </Label>
                <div>
                  <InputField
                    type="email"
                    {...register("email")}
                    placeholder="Input your email"
                  />
                  {errors.email && (
                    <span className="text-red-600 text-sm">
                      {getErrorMessage(errors.email)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-left">
                  Password
                </Label>
                <div>
                  <InputField
                    type="password"
                    {...register("password")}
                    placeholder="Input your password"
                  />

                  {errors.password && (
                    <span className="text-red-600 text-sm">
                      {getErrorMessage(errors.password)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {type}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthForm;
