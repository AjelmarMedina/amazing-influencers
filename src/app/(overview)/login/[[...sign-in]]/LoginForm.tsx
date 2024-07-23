"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}

const formSchema = z.object({
  email: z.string().email().min(2, "Email is too short").max(128, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password is too long"),
})

function Login() {
  const router = useRouter();
  const [clerkError, setClerkError] = useState("");
  const [verifying, setVerifying] = useState(false)  ;
  const {isLoaded, signIn, setActive} = useSignIn();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setVerifying(true);
    handleSignIn(values.email.trimEnd(), values.password.trimEnd());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-stretch space-y-8 bg-white p-5 rounded-xl w-full max-w-lg">
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
        {clerkError && (
          <FormLabel className="text-red-500">
            {clerkError}
          </FormLabel>
        )}
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={verifying}>
          Submit
        </Button>
        <Link href={"/"} className="text-center text-primary hover:underline">
          Forgot your password?
        </Link>
      </form>
    </Form>
  )

  async function handleSignIn(emailAddress: string, password: string) {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (result.status === "complete") {
        console.log(result);
        await setActive({session: result.createdSessionId});
        router.push("/dashboard");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setClerkError(err.errors[0].message);
    }
  }
}