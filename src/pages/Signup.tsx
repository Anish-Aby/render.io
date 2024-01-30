import Logo from "@/components/Logo/Logo";
import GradientAccent from "@/components/ui/GradientAccent";
import { Button } from "@/components/ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const usernameRequiredLength = 3;
const passwordRequiredLength = 8;

const usernameRequiredLengthMessage = `Username must be atleast ${usernameRequiredLength} characters long`;
const passwordRequiredLengthMessage = `Password must be atleast ${passwordRequiredLength} characters long`;

const formSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(usernameRequiredLength, {
      message: usernameRequiredLengthMessage,
    })
    .superRefine((val, ctx) => {
      if (val.includes(" ")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username must not include spaces",
        });
      }

      if (/[^A-Za-z 0-9 _ -]/g.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Special characters are not allowed",
        });
      }
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(passwordRequiredLength, {
      message: passwordRequiredLengthMessage,
    }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase(),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await axios.post(
        "https://render-api.netlify.app/api/users/signup",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (user.status === 201) {
        toast.success("Account successfully created");
      }
      console.log(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response.data.message;
      toast.error(error);
    }
  }

  return (
    <div className="flex w-full min-h-svh h-full justify-center md:justify-start md:min-h-svh">
      <div className="w-2/6 max-w-md min-h-svh h-full hidden md:flex bg-none border-none md:min-w-64 md:w-2/6 md:mr-14 lg:mr-15 lg:w-1/3 xl:mr-20 relative">
        <Logo className="absolute top-5 left-5 hidden md:flex z-20 md:text-base lg:text-lg xl:text-xl" />
        <p className="absolute font-p1 bottom-5 left-5 z-10">
          <a href="https://dribbble.com/nguyenhut">dribbble/@nguyenhut</a>
        </p>
        <video
          aria-hidden="true"
          autoPlay
          className="w-full h-svh min-h-screen object-cover"
          loop={true}
          muted={true}
          playsInline={true}
          src="https://cdn.dribbble.com/users/721278/screenshots/17132227/media/dd43a641fa225caaa7a0c249198293a8.mp4"
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
            <h3 className="text-2xl font-p1">Create your account</h3>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Username</FormLabel>
                      <FormControl>
                        <Input
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
                            className="absolute right-2 rounded-xl"
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
                  Create account
                </Button>
              </form>
            </Form>

            <p className="text-xs text-center">
              When you click 'create account', you agree with Render.io{" "}
              <span className="inline underline">Terms and Conditions</span>,
              and confirming that you've read our{" "}
              <span className="inline underline">Privacy Notice</span>.
            </p>
          </CardContent>
          <CardFooter className="justify-center gap-1 md:pb-0">
            <p>Already have an account?</p>
            <Link to="/login" className="underline">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
