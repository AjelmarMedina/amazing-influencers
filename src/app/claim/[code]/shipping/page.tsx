"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { GiveawaySchema } from "@/app/api/giveaways/get/route"
import { OrderSchema } from "@/app/api/orders/get/route"
import { ShippingInfoSchema } from "@/app/api/reviews/create/route"
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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { ReviewForm } from "../rate/page"

const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short").max(256, "Name is too long"),
  contactNum: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid Phone number"),
  email: z.string().email().min(2).max(256),
  address1: z.string().min(2, "Address is too short").max(512),
  address2: z.string().max(512).optional(),
  city: z.string().min(2, "Too short").max(128),
  stateProvince: z.string().min(2, "Too short").max(128),
  zipCode: z.string().min(2).max(16),
})

export default function Page() {
  return (
    <Suspense>
      <Shipping />
    </Suspense>
  )
}

function Shipping() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [
    encodedOrder,
    encodedReview,
    encodedSurvey,
    encodedGift
  ] = [
    searchParams.get("order"),
    searchParams.get("review"),
    searchParams.get("survey"),
    searchParams.get("gift")
  ];
  const { toast } = useToast();
  const [order, setOrder] = useState<OrderSchema>();
  const [review, setReview] = useState<ReviewForm>();
  const [survey, setSurvey] = useState<SurveySchema>();
  const [gift, setGift] = useState<GiveawaySchema>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    prepareReview();
    if (!order || !review || !survey || !gift) return;
    const shipping: ShippingInfoSchema = values;
    submitReview(order, review, survey, gift, shipping)
  }

  function prepareReview() {
    if (!encodedOrder || !encodedReview || !encodedSurvey || !encodedGift)
      toast({
        title: "Something went wrong...",
        description: "Please reload the page.",
        variant: "destructive",
        action: (
          <ToastAction altText="Reload" onClick={location.reload}>
            Reload
          </ToastAction>
        ),
      });
    else {
      setOrder(JSON.parse(Buffer.from(encodedOrder, "base64").toString()));
      setReview(JSON.parse(Buffer.from(encodedReview, "base64").toString()));
      setSurvey(JSON.parse(Buffer.from(encodedSurvey, "base64").toString()));
      setGift(JSON.parse(Buffer.from(encodedGift, "base64").toString()));
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full">
        <div className="flex flex-col items-stretch text-center">
          <p className="text-[#343A40] text-base italic">Step 5 of 5</p>
          <h2 className="text-base">Please enter your shipping information.</h2>
          <p className="text-[#343A40] text-xs">Please double-check all information is correct before submitting. Inputting incorrect information may result in you not receiving your gift.</p>
          </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4">
                <FormLabel className="">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNum"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4">
                <FormLabel className="">Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="">Address 1</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="">Address 2 (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="">City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="stateProvince"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4">
                <FormLabel className="">State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4">
                <FormLabel className="">ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="ZIP Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="self-end bg-primary hover:bg-primary/90">Next &rarr;</Button>
      </form>
    </Form>
  )

  async function submitReview(order: OrderSchema, submittedReview: ReviewForm, survey: SurveySchema, gift: GiveawaySchema, shippingInfo: ShippingInfoSchema) {
    // prepare request
    const apiUrl = "/api/reviews/create";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order,
        submittedReview,
        survey,
        gift,
        shippingInfo,
      }),
    };

    try {
      // Get order from database
      const response = await fetch(apiUrl, requestData);

      // Error on POST
      if (!response.ok) throw new Error(`Error [${response.status}]: ${response.statusText}`);
      
      router.push(`${pathname.replace("shipping", "thanks")}`)
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong...",
        description: "Please reload the page.",
        variant: "destructive",
      });
    }
  }

}

