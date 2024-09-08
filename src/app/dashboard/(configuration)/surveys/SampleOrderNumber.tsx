"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { InfoIcon } from "lucide-react";

export default function SampleOrderNumber() {
  return (
    <section className="shadow-md rounded-xl bg-white p-6 flex flex-col md:flex-row justify-center md:justify-between space-y-4 md:space-y-0 md:items-center">
      <div className="flex flex-col md:flex-row justify-center md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <InfoIcon className="text-white block self-center" fill="#20c997" />
        <p>To test surveys, use order number <span className="text-[#DAB42B]">888-5049177-9546820</span> for any marketplace. </p>
      </div>
      <Button 
        onClick={() => {
          navigator.clipboard.writeText("888-5049177-9546820")
          toast({
            title: "Copied Sample Order Number",
          })
        }}
      >
        Copy Order Number
      </Button>
    </section>
  )
}