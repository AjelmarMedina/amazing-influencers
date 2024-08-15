"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { UserSchema } from "@/app/api/users/create/route";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
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
import { Textarea } from "@/components/ui/textarea";
import { createGiveaway, getUser, getAllGiveaways } from "@/lib/data";
import { FetcherResponse } from "swr/_internal";
import { ComboboxCreate } from "@/components/ui/combobox-create";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name too short",
  }),
  type: z.string().min(2, {
    message: "Text too short",
  }),
  description: z.string().min(9, { message: "Description too shore"}),
  image: z.optional(z.string()),
  status: z.boolean().default(false),
})

export default function NewGiveawayForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2" onClick={() => setOpen(true)}>
          <PlusIcon />
          Create Giveaway
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new Giveaway
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
      // ✅ This will be type-safe and validated.
      const userId = user?.id;
      if (!userId) return;
  
      createGiveaway(userId, values.name, values.type, values.status)
        .then(val => setOpen(false))
    }

    const fetcher = (arg: string[]): FetcherResponse<any> => getAllGiveaways(arg);
    
    const { data: giveaways, mutate } = useSWR<GiveawaySchema[], any, any>([clerkUser?.primaryEmailAddress?.emailAddress], fetcher)

    const alltypes = giveaways ? giveaways.map((val) => ( {value:val.type, label: val.type} )): []

    // holds dropdown options
    const [options, setOptions ] = useState([])

    const handleCreateOptions = (val:string) =>{
      //@ts-ignore
      setOptions( items => [...items, {value:val, label:val}]);
    }




    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giveaway Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giveaway Type</FormLabel>
                <FormControl>
                <ComboboxCreate
                  options={[...alltypes, ...options]}
                  mode='single'
                  placeholder='Select Type...'
                  selected={field.value} // string or array
                  onChange={(currentValue) => form.setValue('type', currentValue)}
                  onCreate={(value) => {
                    handleCreateOptions(value);
                  }}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giveaway Status</FormLabel>
                <div className="flex flex-row w-max text-nowrap space-x-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex flex-col w-max text-nowrap">
                    {field.value ? (
                      <FormLabel>Active</FormLabel>
                    ) : (
                      <FormLabel>Inactive</FormLabel>
                    )}
                    <FormMessage />
                  </div>
                </div>

              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="" {...field} />
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
