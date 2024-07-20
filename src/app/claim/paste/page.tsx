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
import { Textarea } from "@/components/ui/textarea"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const formSchema = z.object({
  review: z.string()
})

export default function Page() {
  return (
    <Suspense>
      <Paste />
    </Suspense>
  )
}

function Paste() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const review = JSON.parse(Buffer.from(searchParams.get("review") ?? "", "base64url").toString());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: review?.review,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    router.push(`${pathname.replace("paste", "gift")}?${searchParams.toString()}`)
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full">
        <div className="flex flex-col items-stretch text-center">
          <p className="text-[#343A40] text-xs">Step 3 of 5</p>
          <h2 className="text-base">Please fill out the form to claim your reward.</h2>
          <p className="text-[#343A40] text-xs">Please consider leaving your honest, unbiased review on Amazon</p>
        </div>
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="">Paste your review on Amazon</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your review here"
                  {...field}
                  onFocus={(e) => {
                    e.target.select();
                    navigator.clipboard.writeText(field.value);
                  }}
                />
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

