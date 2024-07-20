"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterForm() {
  return (
    <Suspense>
      <Register />
    </Suspense>
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

const verificationFormSchema = z.object({
  code: z.string().min(6, {
    message: "Enter your verification code",
  }),
})

function Register() {
  const {isLoaded, signUp, setActive} = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [userInfo, setUserInfo] = useState<z.infer<typeof registerFormSchema>>();
  const [clerkError, setClerkError] = useState("");

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

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // ✅ This will be type-safe and validated.
    setClerkError("");
    setUserInfo(values)
    handleSignUp();
  }
  
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

  async function handleSignUp() {

    if (!isLoaded) return;
    if (!userInfo) return;

    const emailAddress = userInfo.email;
    const password = userInfo.password;
    const firstName = userInfo.firstName;
    const lastName = userInfo.lastName;
  
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

  function VerificationDialog() {
    const router = useRouter();
    const [submitEnabled, setSubmitEnabled] = useState(false);
  
    const verificationForm = useForm<z.infer<typeof verificationFormSchema>>({
      resolver: zodResolver(verificationFormSchema),
      defaultValues: {
      },
    })
  
    function onSubmit(values: z.infer<typeof verificationFormSchema>) {
      setSubmitEnabled(true);
      handleVerify(values.code);
    }
  
    return (
      <Dialog open={verifying}>
        <DialogContent 
          hideCloseButton
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Verify your Email Address</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            To finish signing up, a verification code will be sent to your email address. Open your email inbox and copy the code to paste it in the field below.
          </DialogDescription>
          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={verificationForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-row justify-center">
                    <FormControl className="">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={submitEnabled}>Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  
    async function handleVerify(code: string) {

      if (!isLoaded) return;
      if (!userInfo) return;

      // Prepare user info
      const emailAddress = userInfo.email;
      const company = userInfo.companyName;
      const firstName = userInfo.firstName;
      const lastName = userInfo.lastName;

      // Prepare POST request
      const apiUrl = "/api/users/create";
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress,
          company,
          firstName,
          lastName,
        }),
      };
    
      try {
        // Create user on Clerk API
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });
        // Create user on database
        const response = await fetch(apiUrl, requestData); 

        // Error on signup
        if (completeSignUp.status !== "complete") return console.log(JSON.stringify(completeSignUp, null, 2));
        // Error on POST
        if (!response.ok) throw new Error(`POST Error: ${response.status} - ${response.statusText}` );
    
        await setActive({session: completeSignUp.createdSessionId});
        router.push("/");
      } catch (err) {
        console.log("Error:", JSON.stringify(err, null, 2));
      }
    }
  }

}
