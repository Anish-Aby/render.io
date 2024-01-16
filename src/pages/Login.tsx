import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="flex w-full items-center flex-col justify-center h-svh">
      <img src="/images/login-grad.jpg" className="absolute top-0 left-0" />
      <Card className="h-4/5 w-4/5 z-10 flex flex-col items-center justify-around rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-primary text-center">
            Log in to Render.io
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Label htmlFor="email" className="font-primary text-xl">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="text-base rounded-lg"
            ></Input>
            <Label htmlFor="password" className="font-primary text-xl">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="text-base rounded-lg"
            ></Input>
            <Button
              className="rounded-full w-full text-xl py-2 font-medium mt-5"
              type="submit"
            >
              Login
            </Button>
            <a className="text-center mt-5 underline">Forgot password?</a>
            <p className="mt-5">
              Don't have an account? <a className="underline">Sign up</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
