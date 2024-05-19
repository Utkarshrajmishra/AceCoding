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
import toast, { Toaster } from "react-hot-toast";
import AuthService from "@/FirebaseServices/Auth";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [isOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = (data: any) => {
    if (type == "Signup" && data) {
      registerUser(data.name, data.email, data.password);
    } else {
      loginUser();
    }
  };

  const getErrorMessage = (error: any) => {
    if (error) {
      return typeof error.message === "string" ? error.message : null;
    }
    return null;
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    const user = await AuthService.registerUser(name, email, password);
    if (user.status) {
      setLoading(false);
      SuccessToast("Account created successfully");
      setDialogOpen(false);
    } else {
      setLoading(false);
      ErrorToast(`Error: ${user.User}`);
    }
  };

  const loginUser = () => {};

  const SuccessToast = (message: string) => toast.success(message);
  const ErrorToast = (message: string) => toast.error(message);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            {type}
          </Button>
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
              {loading ? "Processing..." : type}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AuthForm;
