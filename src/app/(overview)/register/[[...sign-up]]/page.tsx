'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {

  return (
    <main className="w-full h-fit min-h-screen pt-28 py-28 bg-[#F5FAFF]">
      <section className="w-full h-fit text-center py-8">
        <h1 className="text-2xl font-extrabold">
          Sign up now!
        </h1>
        <p className="text-lg">
          Signing up is easy!
        </p>
      </section>
      <section className="w-full flex justify-center">
        <RegisterForm />
      </section>
    </main>
  )
}

const registerFormSchema = z.object({
  firstName: z.string().min(2, "First name is too short").max(64, "First name is too long"),
  lastName: z.string().min(2, "Last name is too short").max(64, "Last name is too long"),
  companyName: z.string().min(2, "Company name is too short").max(128, "Company name is too long"),
  email: z.string().email().min(2, "Email is too short").max(128, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password is too long"),
  isTermsChecked: z.boolean({required_error: ""}),
})

const verificationCodeSchema = z.object({
  code: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function RegisterForm() {
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [clerkError, setClerkError] = useState("");
  const {isLoaded, signUp, setActive} = useSignUp();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
      isTermsChecked: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-stretch space-y-8 bg-white p-5 rounded-xl w-full max-w-lg">
        <div className="grid grid-cols-2 gap-x-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="John Co." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isTermsChecked"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>
                I accept the <Link href={"/"} target="_blank" className="text-primary hover:underline">Terms of Service</Link>
              </FormLabel>
            </FormItem>
          )}
        />
        {clerkError && (
          <FormLabel className="text-red-500">
            {clerkError}
          </FormLabel>
        )}
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={verifying}>Submit</Button>
        <p className="text-center">
          Already hav e an account? <Link href={"/login"} className="text-primary hover:underline">Login</Link>
        </p>
      </form>
      <VerificationDialog />
    </Form>
  )

  function VerificationDialog() {
    const verificationForm = useForm<z.infer<typeof verificationCodeSchema>>({
      resolver: zodResolver(verificationCodeSchema),
      defaultValues: {
        code: "",
      },
    })

    function onVerificationSubmit(values: z.infer<typeof verificationCodeSchema>) {
      handleVerify(values.code);
      setVerifying(false);
    }

    return (
      <Dialog open={verifying} onOpenChange={setVerifying}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify your Email Address</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            To finish signing up, a verification code will be sent to your email address. Open your email inbox and copy the code to paste it in the field below.
          </DialogDescription>
          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-8">
              <FormField
                control={verificationForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter email verification code" {...field} autoComplete={'off'}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // ✅ This will be type-safe and validated.
    setClerkError("");
    if (!isLoaded) return;

    const emailAddress = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({strategy: "email_code"});

      // change the UI to our pending section.
      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors[0].message);
    }
  }

  async function handleVerify(code: string) {
    if (!isLoaded) return;

    console.log(code);
    
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({session: completeSignUp.createdSessionId});
        router.push("/");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  }
}
