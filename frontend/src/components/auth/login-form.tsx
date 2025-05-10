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
import { Link } from "react-router-dom";

interface LoginFormProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-gray-800 bg-muted/10 text-white">
        <CardHeader>
          <CardTitle className="mb-4 text-lg">Нэвтрэх</CardTitle>
          <CardDescription className="text-gray-400">
            Өөрийн бүртгэл рүү нэвтрэхийн тулд имэйл хаягаа оруулна уу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Имэйл</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@nmct.edu.mn"
                  className="bg-background text-white placeholder-gray-400"
                  disabled
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Нууц үг</Label>
                  <Link
                    to="#"
                    className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Нууц үгээ мартсан уу?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-background text-white placeholder-gray-400"
                  disabled
                />
              </div>
              <Button
                type="button"
                className="w-full bg-primary text-white"
                disabled
              >
                Нэвтрэх
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Бүртгэлгүй юу?{" "}
              <Link
                to="/register"
                className="underline text-primary hover:text-primary/80"
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
