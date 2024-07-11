'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().min(2, "Email is too short").max(128, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password is too long"),
  isRememberMe: z.boolean().optional(),
})

export default function Login() {

  return (
    <main className="w-full h-fit min-h-screen pt-28 py-28 bg-[#F5FAFF]">
      <section className="w-full h-fit text-center py-8">
        <h1 className="text-2xl font-extrabold">
          Login To Your Account!
        </h1>
        <p className="text-lg">
          Or <Link href={"/register"} className="text-primary hover:underline">Register here</Link>
        </p>
      </section>
      <section className="w-full flex justify-center px-4 md:px-8">
        <RegisterForm />
      </section>
    </main>
  )
}

function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values)
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
              <FormField
                control={form.control}
                name="isRememberMe"
                render={({ field }) => (
                  <FormItem className="space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Submit
        </Button>
        <Link href={"/"} className="text-center text-primary hover:underline">
          Forgot your password?
        </Link>
      </form>
    </Form>
  )
}