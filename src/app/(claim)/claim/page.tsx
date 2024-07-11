"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Suspense } from "react"

const orders = [
  {
    orderId: "5731649285714360",
    name: "Hydrating Serum",
  },
]

const formSchema = z.object({
  orderNum: z.string().min(16).max(16).refine((val) => orders.find((order) => order.orderId === val), 
    { message: "Order doesn't exist" }
  ),
})

export default function Page() {
  return (
    <Suspense>
      <Claim />
    </Suspense>
  )
}

function Claim() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const orderNum = searchParams.get('code');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNum: orderNum ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const params = new URLSearchParams();
    params.set("order", values.orderNum);
    router.push(`${pathname}/rate?${params.toString()}`)
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full text-center">
        <div className="flex flex-col items-stretch">
          <p className="text-[#343A40] text-xs">Step 1 of 5</p>
          <h2 className="text-base">Please fill out the form to claim your reward.</h2>
        </div>
        <Image 
          alt=""
          src={"/claim/order-number.png"}
          width={112}
          height={112}
          className="self-center"
        />
        <FormField
          control={form.control}
          name="orderNum"
          render={({ field }) => (
            <FormItem className="flex flex-col items-stretch space-y-4">
              <FormLabel className="text-center w-full font-bold">Enter your order number <span className="text-red-600">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your order number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end bg-primary hover:bg-primary/90">Next &rarr;</Button>
      </form>
    </Form>
  )
}