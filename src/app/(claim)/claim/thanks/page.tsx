"use client"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image"

const formSchema = z.object({
})

export default function Rate() {
  return(
    <div className="space-y-8 flex flex-col items-stretch bg-white p-5 rounded-xl w-full text-center">
      <Image 
          alt=""
          src={"/claim/thanks.png"}
          width={80}
          height={80}
          className="self-center"
        />
      <h2 className="text-base">Thank you for your feedback!</h2>
      <p className="text-[#343A40] text-xs">We appreciate you taking the time to share your experience with us! Please check your email for instructions on how to claim your gift card.</p>
      <Button className="self-end bg-primary hover:bg-primary/90">
        <Link href={"/"}>
          Next &rarr;
        </Link>
      </Button>
    </div>
  )


}

