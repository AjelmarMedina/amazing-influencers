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
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

const orders = [
  {
    orderId: "5731649285714360",
    name: "Hydrating Serum",
  },
]

const formSchema = z.object({
  rating: z.preprocess((val) => Number(val), z.number()),
  name: z.string().min(2, "Name too short").max(256, "Name too long"),
  phoneNum: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid Phone number"),
  email: z.string().email(),
  review: z.string().min(8, "Leave a longer review").max(512, "Review is too long")
})

export default function Page() {
  return (
    <Suspense>
      <Rate />
    </Suspense>
  )
}

function Rate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const order = orders.find((row) => row.orderId === searchParams.get("code"));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const params = new URLSearchParams();
    const base64 = btoa(JSON.stringify(values));
    params.set("review", base64);
    router.push(`${pathname.replace("rate", "paste")}?${params.toString()}`)
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full">
        <div className="flex flex-col items-stretch text-center">
          <p className="text-[#343A40] text-xs">Step 2 of 5</p>
          <h2 className="text-base">Please fill out the form to claim your reward.</h2>
        </div>
        <article className="flex flex-col items-center font-bold text-base text-center">
          <h2>You purchased</h2>
          <Image 
            alt=""
            src={"/claim/placeholder.png"}
            width={100}
            height={100}
            className="self-center"
          />
          <h2>{order?.name}</h2>
        </article>
        <Ratings />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4">
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNum"
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
          name="review"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="">What did you like or dislike? How was your overall experience?</FormLabel>
              <FormControl>
                <Textarea placeholder="What did you like or dislike? How was your overall experience?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end bg-primary hover:bg-primary/90">Next &rarr;</Button>
      </form>
    </Form>
  )

  function Ratings() {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<null | number>(null);
    const totalStars = 5;

    return (
      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem className="space-y-3 items-center text-center ">
            <FormLabel className="text-base text-[#343A40]">Rate the Product</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
                className="flex flex-row justify-center space-x-1"
              >
                {[...Array(totalStars)].map((star, index) => {
                  const currentRating = index + 1;

                  return (
                    <FormItem
                      key={index}
                      className="flex items-center space-x-3 space-y-0 font-normal hover:cursor-pointer"
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <FormControl>
                        <RadioGroupItem value={currentRating.toString()} onChange={() => setRating(currentRating)} className="hidden"/>
                      </FormControl>
                      <FormLabel 
                        className="text-4xl hover:cursor-pointer"
                        style={{
                          color: 
                            currentRating <= (hover || field.value)
                              ? "#ffc107"
                              : "#e4e5e9"
                        }}
                      >
                        &#9733;
                      </FormLabel>
                    </FormItem>
                    
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

}

