"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <Suspense>
      <AccountForm />
    </Suspense>
  )
}

const formSchema = z.object({
  name: z
    .union([z.string().min(4, "Too short"), z.string().length(0), z.string().max(128, "Too long")])
    .optional()
    .transform(e => e === "" ? undefined : e),
  blacklist: z
    .union([z.string().min(4, "Too short"), z.string().length(0), z.string().max(128, "Too long")])
    .optional()
    .transform(e => e === "" ? undefined : e),
})

function AccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      blacklist: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    if (!(values.blacklist && values.blacklist)) return;
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h2 className="font-bold text-lg">Account</h2>
          <p>
            Edit your account details
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your account name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <div>
          <h2 className="font-bold text-lg">Order ID Blacklist</h2>
          <p>
            Prevent specific order IDs from being able to access your surveys by adding them here.
          </p>
        </div>
        <FormField
          control={form.control}
          name="blacklist"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Enter blacklisted order IDs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4">
          <Button type="submit">
            Update
          </Button>
          <Button type="reset" onClick={() => form.reset({ name: "", blacklist: "" })} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}