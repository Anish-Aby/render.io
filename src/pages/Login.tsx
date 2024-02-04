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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { useUserInfo } from "@/hooks/useUserInfo";
import LoaderCircle from "@/components/LoaderCircle/LoaderCircle";

const formSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Please enter your password"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase(),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const currentUser = useUserInfo();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await axios.post(
        "https://render-api.netlify.app/api/users/login",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (user.status === 200) {
        const userInfo = user.data.userInfo;
        const userToken = user.data.token;
        dispatch(login({ userInfo, userToken }));
        toast.success("Logged in successfully");
        navigate("/");
        console.log(currentUser);
      }
      console.log(`This is from axios: ${user}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response.data.message;
      toast.error(error);
    }
  }

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="text-base p-6 rounded-xl md:shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="text-base p-6 rounded-xl md:shadow-none"
                            {...field}
                          />
                          <Button
                            className="rounded-xl absolute right-2"
                            variant={"secondary"}
                            type="button"
                            onClick={() =>
                              setShowPassword((curShowPass) => !curShowPass)
                            }
                          >
                            {showPassword ? (
                              <IoEyeOffOutline />
                            ) : (
                              <IoEyeOutline />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={form.formState.isSubmitting && true}
                  type="submit"
                  className="rounded-full font-p2 text-lg p-6 bg-greenAccent text-black hover:text-primary-foreground md:my-5"
                >
                  <LoaderCircle
                    isSubmitting={form.formState.isSubmitting && true}
                  />
                  Login to Render
                </Button>
              </form>
            </Form>
            <p className="underline text-base flex justify-center">
              <Link to={"/forgotPassword"}>Forgot password?</Link>
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
