import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex max-w-xl items-center flex-col justify-center h-svh font-p1">
      <Card className="w-11/12 flex flex-col rounded-3xl py-2 min-h-fit">
        <CardHeader>
          <CardTitle className="uppercase font-p3 text-2xl">
            render.io
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col w-full h-full gap-5">
          <h3 className="text-2xl font-p1">Create your account</h3>
          <div className="flex flex-col gap-4">
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="text-base p-6 rounded-xl"
            ></Input>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password" className="text-base">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              className="text-base p-6 rounded-xl"
            ></Input>
          </div>
          <Button className="rounded-full font-p2 text-lg p-6 bg-greenAccent text-black">
            Create account
          </Button>
          <p className="text-xs text-center">
            When you click 'create account', you agree with Render.io{" "}
            <span className="inline underline">Terms and Conditions</span>, and
            confirming that you've read our{" "}
            <span className="inline underline">Privacy Notice</span>.
          </p>
        </CardContent>
        <CardFooter className="justify-center gap-1">
          <p>Already have an account?</p>
          <Link to="/login" className="underline">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
