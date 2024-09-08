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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ReviewForm } from "../rate/page"
import { Input } from "@/components/ui/input"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  review: z.string().optional()
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
  const encodedReview = searchParams.get("review");
  const { toast } = useToast();
  const [review, setReview] = useState<ReviewForm>();
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  useEffect(() => {
    if (!encodedReview) 
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
    else setReview(JSON.parse(Buffer.from(encodedReview, "base64").toString()))

  }, [encodedReview, searchParams, toast])

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
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
          <p className="text-[#343A40] text-base italic">Step 3 of 5</p>
          <h2 className="text-base">Please complete the following steps to claim your reward.</h2>
          <p className="text-[#343A40] text-xs">Please consider posting about us online. As well as leaving your honest, unbiased review on Amazon</p>
        </div>

        <div 
          className={cn("rounded-xl border-2 overflow-x-hidden flex flex-col items-stretch text-center",
            step1Done ? "border-primary" : "border-slate-100"
          )}
        >
          <header className="bg-slate-100 justify-center py-4">
            <h3 className="font-bold">Step 1:</h3>
            <p>
              Post images and make a reel on Instagram
            </p>
          </header>
          <Button 
            className="m-4"
            onClick={() => setStep1Done(true)} // Set done after 
            asChild
          >
            <Link href="https://instagram.com/" target="_blank">
              Open Instagram <ExternalLinkIcon className="ml-2 w-1 h-1" />
            </Link>
          </Button>
        </div>
        <div 
          className={cn("rounded-xl border-2 overflow-x-hidden flex flex-col items-stretch text-center",
            step2Done ? "border-primary" : "border-slate-100"
          )}
        >
          <header className="bg-slate-100 justify-center py-4">
            <h3 className="font-bold">Step 2:</h3>
            <p>
              Tag us with our account on Instagram
            </p>
          </header>
          <Button 
            className="m-4"
            onClick={() => setStep2Done(true)} // Set done after 
            asChild
          >
            <Link href="https://instagram.com/amazinginfluencers" target="_blank">
              Open Amazing Influencers <ExternalLinkIcon className="ml-2 w-1 h-1" />
            </Link>
          </Button>
        </div>
        <div 
          className={cn("rounded-xl border-2 overflow-x-hidden flex flex-col items-stretch text-center",
            step3Done ? "border-primary" : "border-slate-100"
          )}
        >
          <header className="bg-slate-100 justify-center py-4">
            <h3 className="font-bold">Step 3:</h3>
            <p>Give your review on the platform you made the purchase</p>
          </header>
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4 p-4">
                <FormLabel className="">Click on the field to open and paste your review on Amazon</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly
                    placeholder="Paste your review here"
                    defaultValue={review?.review}
                    {...field}
                    onFocus={(e) => {
                      e.target.select();
                      navigator.clipboard.writeText(review?.review ?? "");
                      window.open("https://amazon.com/", "_blank")?.focus();
                      setStep3Done(true);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div 
          className={cn("rounded-xl border-2 border-slate-100 overflow-x-hidden flex flex-col items-stretch text-center")}
        >
          <header className="bg-slate-100 justify-center py-4">
            <h3 className="font-bold">Step 4:</h3>
            <p>
              Submit your details to unlock your reward of your choosing
            </p>
          </header>
          <Button 
            type="submit" 
            className="m-4 bg-primary hover:bg-primary/90" 
            disabled={!(step1Done && step2Done && step3Done)}
          >
            Next Step &rarr;
          </Button>
        </div>

      </form>
    </Form>
  )


}

