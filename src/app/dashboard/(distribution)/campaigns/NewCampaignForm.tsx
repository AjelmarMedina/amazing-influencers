"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";


import { UserSchema } from "@/app/api/users/create/route";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCampaign, getUser, getAllCampaigns } from "@/lib/data";
import { FetcherResponse } from "swr/_internal";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name too short",
  }),
  delay: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  })
})

export default function NewCampaignForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2" onClick={() => setOpen(true)}>
          <PlusIcon />
          Create Campaign
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new Campaign
          </DialogTitle>
        </DialogHeader>
        <Suspense>
          <Content />
        </Suspense>
      </DialogContent>
    </Dialog>
  )

  function Content() {
    const { user: clerkUser } = useUser();
    
    const { data: user } = useSWR<UserSchema, any, any>(
      clerkUser?.primaryEmailAddress?.emailAddress,
      (arg: string): FetcherResponse<any> => getUser(arg),
    )
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
      // This will be type-safe and validated.
      const userId = user?.id;
      if (!userId) return;
  
      createCampaign(userId, values.name, values.delay)
        .then(val => setOpen(false))
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>

                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Delay</FormLabel>
                <p className="text-xs tracking-tight text-gray-700 my-4">After a customer Order is added to GetReviews via CSV Upload or API, we&apos;ll wait this many days before beginning a review request campaign. We recommend at least 30 days for digital products, or 7 days for physical products.</p>
                <FormControl>
                <FormControl>
                  <Input type="number" placeholder="Delay(in days)" {...field} />
                </FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }
}
