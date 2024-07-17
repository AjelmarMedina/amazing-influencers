"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Page() {
  return (
    <Suspense>
      <AccountForm />
    </Suspense>
  )
}

const formSchema = z.object({
  confirmation: z
    .union([z.enum(['true', 'false']), z.boolean()])
    ,
  replyAddress: z
    .union([z.string().email(), z.string().min(4, "Too short"), z.string().length(0), z.string().max(256, "Too long")])
    .optional()
    .transform(e => e === "" ? undefined : e),
  responseSubject: z
    .union([z.string().min(4, "Too short"), z.string().length(0), z.string().max(512, "Too long")])
    .optional()
    .transform(e => e === "" ? undefined : e),
  responseTemplate: z
    .union([z.string().min(4, "Too short"), z.string().length(0)])
    .optional()
    .transform(e => e === "" ? undefined : e),
})

function AccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmation: "true",
      replyAddress: "",
      responseSubject: "",
      responseTemplate: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h2 className="font-bold text-lg">Mail</h2>
          <p>
            Send an email to every survey respondent using this setting.
          </p>
        </div>
        <hr />
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Send confirmation emails</FormLabel>
              <FormDescription className="font-base">
                Enabling this feature will send a confirmation email to all users who submit a survey thanking them for their feedback.
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={`true`}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Yes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'true'} defaultChecked>Yes</SelectItem>
                  <SelectItem value={'false'}>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="replyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Email reply address</FormLabel>
              <FormDescription className="font-base">
                This address will show as the reply address on mail sent by GetReviews.
              </FormDescription>
              <FormControl>
                <Input placeholder="Email reply address" {...field} />
              </FormControl>
              <FormDescription className="font-base text-sm">
                This email will be set as the &apos;reply-to&apos; address. To white-label your messages, email &nbsp;
                <Link href={"mailto:amazinginfluencers@gmail.com"}>amazinginfluencers@gmail.com</Link> &nbsp;
                for easy setup instructions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="responseSubject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Response Confirmation Email Subject Line</FormLabel>
              <FormDescription className="font-base">
                This will show as the subject line for response confirmation + coupon giveaway emails.
              </FormDescription>
              <FormControl>
                <Input placeholder="Subject line" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="responseTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Response Confirmation Email Template</FormLabel>
              <FormDescription className="font-base">
                Template to be used for response confirmation emails.
              </FormDescription>
              <FormControl>
                <Textarea placeholder="Email template" {...field} />
              </FormControl>
              <FormDescription className="font-base text-sm">
                Want to see what it looks like? &nbsp;
                <Link href={"mailto:amazinginfluencers@gmail.com"}>Send a preview</Link> &nbsp;
                to cbcsaif.uae@gmail.com.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4">
          <Button type="submit">
            Update
          </Button>
          <Button type="reset" onClick={() => {form.reset({}); form.reset({})}} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}