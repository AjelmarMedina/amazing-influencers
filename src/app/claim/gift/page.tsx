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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const giveaways = [
  "$1 Amazon gift card",
  "$2 Amazon gift card",
  "$3 Amazon gift card",
  "$4 Amazon gift card",
]

const formSchema = z.object({
  gift: z.string({ required_error: "Choose your gift" })
})

export default function Page() {
  return (
    <Suspense>
      <Gift />
    </Suspense>
  )
}

function Gift() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gift: giveaways[0],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const params = new URLSearchParams(searchParams);
    const base64 = btoa(JSON.stringify(values));
    params.append("gift", base64);
    router.push(`${pathname.replace("gift", "shipping")}?${params.toString()}`)
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full">
        <div className="flex flex-col items-stretch text-center">
          <p className="text-[#343A40] text-xs">Step 4 of 5</p>
          <h2 className="text-base">Please fill out the form to claim your reward.</h2>
          <p className="text-[#343A40] text-xs">Please consider leaving your honest, unbiased review on Amazon</p>
        </div>
        <FormField
          control={form.control}
          name="gift"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your gift</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={giveaways[0]} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {giveaways.map((gift, index) => (
                    <SelectItem key={index} value={gift}>
                      {gift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end bg-primary hover:bg-primary/90">Next &rarr;</Button>
      </form>
    </Form>
  )


}

