import Logo from "@/components/Logo/Logo";
import GradientAccent from "@/components/ui/GradientAccent";
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

export default function Login() {
  return (
    <div className="flex w-full justify-center md:justify-start md:min-h-screen">
      <div className="w-2/6 max-w-md h-full hidden md:flex bg-none border-none md:min-w-64 md:w-2/6 md:mr-14 lg:mr-15 lg:w-1/3 xl:mr-20 relative">
        <Logo className="absolute top-5 left-5 hidden md:flex z-20 md:text-base lg:text-lg xl:text-xl" />
        <p className="absolute font-p1 bottom-5 left-5 z-10">
          <a href="https://dribbble.com/nguyenhut">dribbble/@nguyenhut</a>
        </p>
        <video
          aria-hidden="true"
          autoPlay
          className="w-full h-screen object-cover"
          loop={true}
          muted={true}
          playsInline={true}
          src="https://cdn.dribbble.com/users/721278/screenshots/15601708/media/37eac1fd2d5a76b8aeccabe1896cdb6d.mp4"
        ></video>
      </div>
      <div className="flex max-w-xl items-center flex-col justify-center h-svh font-p1 w-full md:items-start">
        <div className="md:hidden">
          <GradientAccent />
        </div>
        <Card className="w-11/12 flex flex-col rounded-3xl py-2 min-h-fit md:gap-0 md:border-none md:shadow-none md:py-0 md:w-4/6 lg:gap-0 xl:gap-8 xl:w-11/12">
          <CardHeader>
            <CardTitle className="uppercase font-p3 text-2xl">
              render.io
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col w-full h-full gap-5">
            <h3 className="text-2xl font-p1">Login to Render.io</h3>
            <div className="flex flex-col gap-4">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="text-base p-6 rounded-xl md:shadow-none"
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
                className="text-base p-6 rounded-xl md:shadow-none"
              ></Input>
            </div>
            <Button className="rounded-full font-p2 text-lg p-6 bg-greenAccent text-black hover:text-primary-foreground md:my-5">
              Login to Render
            </Button>
            <p className="underline text-base flex justify-center">
              Forgot password?
            </p>
          </CardContent>
          <CardFooter className="justify-center gap-1 md:pb-0">
            <p>Don't have an account?</p>
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
