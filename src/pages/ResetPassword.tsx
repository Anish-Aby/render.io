import LoaderCircle from "@/components/LoaderCircle/LoaderCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const passwordRequiredLength = 8;
const passwordRequiredLengthMessage = `Password must be atleast ${passwordRequiredLength} characters long`;

const formSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(passwordRequiredLength, {
      message: passwordRequiredLengthMessage,
    }),
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { tokenId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const postURL = `https://render-api.netlify.app/api/users/resetPassword/${tokenId}`;
      const user = await axios.post(postURL, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(user);

      //   user.data.token

      if (user.status === 200) {
        setIsPasswordReset(true);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response.data.message;
      toast.error(error);
    }
  }

  return (
    <div className="w-full min-h-svh flex flex-col items-center justify-center">
      <div className="flex max-w-xl items-center flex-col justify-center h-svh font-p1 w-full md:items-start">
        <Card className="w-11/12 flex flex-col rounded-3xl py-2 min-h-fit md:gap-0 md:border-none md:shadow-none md:py-0 md:w-4/6 lg:gap-0 xl:gap-8 xl:w-11/12">
          <CardHeader>
            <CardTitle className="uppercase font-p3 text-2xl">
              Render.io
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col w-full h-full gap-5">
            {isPasswordReset ? (
              <>
                <h3 className="text-2xl font-p1">All done!</h3>
                <p className="text-base">
                  Your password has been reset so now you can log in to your
                  account.
                </p>
                <div className="flex flex-col gap-1">
                  <Button
                    className="relative rounded-full font-p2 text-lg p-6 hover:text-primary-foreground bg-greenAccent text-black md:my-5"
                    asChild
                  >
                    <Link to={"/login"}>Login</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-p1">Reset your password</h3>
                <p className="text-base">Enter your new password</p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
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

                    <p className="text-sm opacity-70">
                      Please re-check your password before submitting it.
                    </p>

                    <Button
                      disabled={form.formState.isSubmitting && true}
                      type="submit"
                      className="relative rounded-full font-p2 text-lg p-6 bg-greenAccent text-black hover:text-primary-foreground md:my-5"
                    >
                      <LoaderCircle
                        isSubmitting={form.formState.isSubmitting && true}
                      />
                      Reset password
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
