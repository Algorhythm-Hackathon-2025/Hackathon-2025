import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

import { User, LoginResponse } from "../../types/index";

interface LoginFormProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: User | null } }) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: LoginResponse = await login({ email, password }).unwrap();

      // Construct the payload to match the structure expected by setCredentials:
      // User & { token: string }
      dispatch(
        setCredentials({
          username: res.user.username,
          number: res.user.number,
          password: res.user.password,
          role: res.user.role,
          createdAt: res.user.createdAt,
        })
      );

      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Нэвтрэх үед алдаа гарлаа");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-gray-800 bg-[rgb(35,37,44)] text-white">
        <CardHeader>
          <CardTitle className="mb-4 text-lg">Нэвтрэх</CardTitle>
          <CardDescription className="text-gray-400">
            Өөрийн бүртгэл рүү нэвтрэхийн тулд имэйл хаягаа оруулна уу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Имэйл</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@nmct.edu.mn"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Нууц үг</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm text-blue-400 underline-offset-4 hover:underline hover:text-blue-300"
                  >
                    Нууц үгээ мартсан уу?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full border border-gray-700 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Бүртгэлгүй юу?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4 text-blue-400 hover:text-blue-300"
              >
                Бүртгүүлэх
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
