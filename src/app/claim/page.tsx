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
import { Suspense, useState } from "react"

export default function Page() {
  return (
    <Suspense>
      <Claim />
    </Suspense>
  )
}

const formSchema = z.object({
  orderNum: z.string({ required_error: "Enter your Order Number" }).trim(),
})

function Claim() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const orderNum = searchParams.get('code');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNum: orderNum ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setSubmitDisabled(true);
    handleOrderFetch(values.orderNum.trim());
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
        <Button
          type="submit"
          className="self-end"
          disabled={submitDisabled}
        >
          Next &rarr;
        </Button>
      </form>
    </Form>
  )

  async function handleOrderFetch(orderNum: string) {
    // prepare request
    const apiUrl = "/api/orders/get";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNum
      }),
    };

    try {
      // Get order from database
      const response = await fetch(apiUrl, requestData);
      const order = await response.json();

      // Order not found
      if (!order) throw form.setError("orderNum", {message: "Order not found..."});
      // Error on POST
      if (!response.ok) throw form.setError("orderNum", {message: "Something went wrong..."});
  
      handleSurveyFetch(order.surveyCode, orderNum)
    } catch (err) {
      setSubmitDisabled(false);
    }
  }

  async function handleSurveyFetch(surveyCode: string, orderNum: string) {
    // prepare request
    const apiUrl = "/api/surveys/get";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        surveyCode
      }),
    };

    try {
      // Get order from database
      const response = await fetch(apiUrl, requestData);
      const survey = await response.json();

      // Order not found
      if (!survey) throw form.setError("orderNum", {message: "Surveys for your product order are not active..."});
      // Error on POST
      if (!response.ok) throw form.setError("orderNum", {message: "Something went wrong..."});
  
      // Pass orderNum as param to next step
      const params = new URLSearchParams();
      params.set("order", orderNum ?? "");
      router.push(`${pathname}/rate?${params.toString()}`)
    } catch (err) {
      setSubmitDisabled(false);
    }
  }
  

}