import LoaderCircle from "@/components/LoaderCircle/LoaderCircle";
import Logo from "@/components/Logo/Logo";
import GradientAccent from "@/components/ui/GradientAccent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase(),
});

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await axios.post(
        "https://render-api.netlify.app/api/users/forgotPassword",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (user.status === 200) {
        toast.success("Email sent successfully");
      }

      console.log(values);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response.data.message;
      toast.error(error);
    }
  }

  return (
    <div className="flex w-full min-h-svh font-p1 items-center">
      <div className="w-2/6 max-w-md h-full hidden md:flex bg-none border-none md:min-w-64 md:w-2/6 md:mr-14 lg:mr-15 lg:w-1/3 xl:mr-20 relative">
        <Logo className="absolute top-5 left-5 hidden md:flex z-20 md:text-base lg:text-lg xl:text-xl" />
        <p className="absolute font-p1 bottom-5 left-5 z-10">
          <a href="https://dribbble.com/NerminMuminovic">
            dribbble/@NerminMuminovic
          </a>
        </p>
        <video
          aria-hidden="true"
          autoPlay
          className="w-full h-screen object-cover"
          loop={true}
          muted={true}
          playsInline={true}
          src="https://cdn.dribbble.com/userupload/12806669/file/original-8db28e7c4c46807e68722db1007a6dc8.mp4"
        ></video>
      </div>
      <div className="md:hidden">
        <GradientAccent />
      </div>
      <div className="flex max-w-xl items-center flex-col justify-center h-svh font-p1 w-full md:items-start">
        <Card className="w-11/12 flex flex-col rounded-3xl py-2 min-h-fit md:gap-0 md:border-none md:shadow-none md:py-0 md:w-4/6 lg:gap-0 xl:gap-8 xl:w-11/12">
          <CardHeader>
            <CardTitle className="uppercase font-p3 text-2xl">
              Render.io
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col w-full h-full gap-5">
            <h3 className="text-2xl font-p1">Forgot your password?</h3>
            <p className="text-base">
              Enter the email address associated with your account
            </p>
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
                <p className="text-sm opacity-70">
                  If your email exists in our database, you will receive a
                  password recovery link in a few minutes.
                </p>

                <Button
                  disabled={form.formState.isSubmitting && true}
                  type="submit"
                  className="relative rounded-full font-p2 text-lg p-6 bg-greenAccent text-black hover:text-primary-foreground md:my-5"
                >
                  <LoaderCircle
                    isSubmitting={form.formState.isSubmitting && true}
                  />
                  Send email
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
