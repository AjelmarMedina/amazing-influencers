"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { notFound, usePathname, useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { OrderSchema } from "@/app/api/orders/get/route"
import { SurveySchema } from "@/app/api/surveys/get/route"
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
import { getSurvey } from "@/lib/data"
import Image from "next/image"
import { Suspense, useState } from "react"
import useSWR from "swr"

export default function Page({ params }: { params: { code: string } }) {
  const { data: survey, isLoading } = useSWR<SurveySchema | null, any, any>(params.code, getSurvey);

  if (!isLoading && !survey) {
    notFound();
  }
  if (survey) {
    return (
      <Suspense>
        <Claim survey={survey} />
      </Suspense>
    )
  }
}

const formSchema = z.object({
  orderNum: z.string({ required_error: "Enter your Order Number" }).min(16, "Enter an Order Number").trim(),
})

function Claim({ survey }: { survey: SurveySchema }) {
  const params = new URLSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNum: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setSubmitDisabled(true);
    verifyOrder(values.orderNum.trim());
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full text-center">
        <div className="flex flex-col items-stretch">
          <p className="text-[#343A40] text-base italic">Step 1 of 5</p>
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

  async function verifyOrder(orderNum: string) {
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
      const order: OrderSchema | null | undefined = await response.json();

      // Order not found
      if (!order) throw new Error("Order not found...");
      // Error on POST
      if (!response.ok) throw new Error("Something went wrong...");
  
      const encodedOrder = Buffer.from(JSON.stringify(order)).toString("base64");
      const encodedSurvey = Buffer.from(JSON.stringify(survey)).toString("base64");
      params.set("order", encodedOrder);
      params.set("survey", encodedSurvey);
      router.push(`${pathname}/rate?${params.toString()}`)
    } catch (err) {
      setSubmitDisabled(false);
      form.setError("orderNum", {message: `${err}`});
      console.log(err);
    }
  }

}