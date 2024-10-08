"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { preload } from "swr";
import { z } from "zod";

import { UserSchema } from "@/app/api/users/create/route";
import { ProductSchema } from "@/app/api/products/get/route";
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
import { createProduct, getUser, getAllProducts } from "@/lib/data";
import { FetcherResponse } from "swr/_internal";
import { ComboboxCreate } from "@/components/ui/combobox-create";
   
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name too short",
  }),
  type: z.string().min(2, {
    message: "Text too short",
  }),
  image: z.optional(z.string()),
})

export default function NewProductForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2" onClick={() => setOpen(true)}>
          <PlusIcon />
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new product
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
    const [options, setOptions ] = useState([])
   
    const handleCreateOptions = (val:string) =>{
      // @ts-ignore
      setOptions( items => [...items, {value:val, label:val}]);
    }

    const { data: user } = useSWR<UserSchema, any, any>(
      clerkUser?.primaryEmailAddress?.emailAddress,
      (arg: string): FetcherResponse<any> => getUser(arg),
    )

    const fetcher = (arg: string[]): FetcherResponse<any> => getAllProducts(arg);
    
    const { data: products, mutate } = useSWR<ProductSchema[], any, any>([clerkUser?.primaryEmailAddress?.emailAddress], fetcher)

    const alltypes = products ? products.map((prod) => ( {value:prod.type, label: prod.type} )): []
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
      // ✅ This will be type-safe and validated.
      const userId = user?.id;
      if (!userId) return;
  
      createProduct(userId, values.name, values.type)
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
                <FormLabel>Product Name</FormLabel>
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
                <FormLabel>Product Type</FormLabel>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
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
