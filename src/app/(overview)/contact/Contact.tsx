
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name too short").max(256, "Name too long"),
  email: z.string().email(),
  subject: z.string().min(2, "Too short").max(128, "Too long"),
  query: z.string().min(8, "Leave a longer review").max(512, "Review is too long")
})

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    
    const name = values.name;
    const email = values.email;
    const subject = values.subject;
    const message = values.query;

    const response = await fetch('/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      }),
    });

    const responseText = await response.text();

    if (response.status <= 400 && response.status < 600) {
      console.error(responseText);
      toast({
        title: "Thank you for reaching out!",
      })
    } else {
      console.log(responseText);
      setSubmitted(false);
      toast({
        title: "Something went wrong...",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full h-full">
        <div className="flex flex-col items-stretch text-center md:text-start">
          <h1 className="text-3xl font-bold">GET IN TOUCH</h1>
          <p className="text-[#343A40] text-lg">Fill the contact form to send us your query.</p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4 h-full">
              <FormControl>
                <Textarea placeholder="Write your query" {...field} className="h-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={submitted}>Next &rarr;</Button>
      </form>
    </Form>
  )
}