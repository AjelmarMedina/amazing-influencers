"use client"

import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { ShippingInfoSchema } from "@/app/api/reviews/create/route";
import { SurveySchema } from "@/app/api/surveys/get/route";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { OrderSchema } from "@/app/api/orders/get/route";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ReviewForm } from '../rate/[survey]/page';

export default function Rate() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [encodedOrder, encodedReview, encodedSurvey, encodedGift, encodedShippingInfo] = [
    searchParams.get("order"), searchParams.get("review"), searchParams.get("survey"), searchParams.get("gift"), searchParams.get("shipping")
  ];

  useEffect(() => {
    if (!encodedOrder || !encodedReview || !encodedSurvey || !encodedGift || !encodedShippingInfo)
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
      const order: OrderSchema = JSON.parse(Buffer.from(encodedOrder, "base64url").toString());
      const review: ReviewForm = JSON.parse(Buffer.from(encodedReview, "base64url").toString());
      const survey: SurveySchema = JSON.parse(Buffer.from(encodedSurvey, "base64url").toString());
      const gift: GiveawaySchema = JSON.parse(Buffer.from(encodedGift, "base64url").toString());
      const shipping: ShippingInfoSchema = JSON.parse(Buffer.from(encodedShippingInfo, "base64url").toString());
      submitReview(order, review, survey, gift, shipping)
    }
  })

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

