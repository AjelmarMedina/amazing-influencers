"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { GiveawaySchema } from "@/app/api/giveaways/get/route"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

const formSchema = z.object({
  gift: z.coerce.number()
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
  const encodedSurvey = searchParams.get("survey");
  const [giveaways, setGiveaways] = useState<Array<GiveawaySchema>>();

  useEffect(() => {
    if (!encodedSurvey) 
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
      const survey: SurveySchema = JSON.parse(Buffer.from(encodedSurvey, "base64").toString())
      setGiveaways(survey?.giveaways)
    }
  }, [encodedSurvey])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const params = new URLSearchParams(searchParams);
    const encodedValues = Buffer.from(JSON.stringify(giveaways?.[values.gift])).toString("base64");
    params.append("gift", encodedValues);
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
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a gift"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {giveaways?.map((gift: GiveawaySchema, index: number) => (
                    <SelectItem key={index} value={`${index}`}>
                      {gift.name}
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

