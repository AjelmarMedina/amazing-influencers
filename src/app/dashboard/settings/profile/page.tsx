"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <Suspense>
      <AccountForm />
    </Suspense>
  )
}

const formSchema = z.object({
  name: z
    .union([z.string().min(4, "Too short"), z.string().length(0), z.string().max(256, "Too long")])
    .optional()
    .transform(e => e === "" ? undefined : e),
  email: z
    .union([z.string().min(4, "Too short"), z.string().length(0), z.string().max(256, "Too long")])
    .optional()
    .transform(e => e === "" ? undefined : e),
})

function AccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    if (!(values.email && values.email)) return;
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h2 className="font-bold text-lg">Profile</h2>
          <p>
            Edit your profile details
          </p>
        </div>
        <hr />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4">
          <Button type="submit">
            Update
          </Button>
          <Button type="reset" onClick={() => form.reset({ name: "", email: "" })} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}