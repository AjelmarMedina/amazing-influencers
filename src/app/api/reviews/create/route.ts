"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { ReviewForm } from '../../../claim/rate/[survey]/page';
import { GiveawaySchema } from '../../giveaways/get/route';
import { OrderSchema } from '../../orders/get/route';
import { SurveySchema } from "../../surveys/get/route";

export type ReviewsSchema = {
  id?: string
  orderNum: string
  rating: number
  reviewerInfo: {
    name: string
    phone: string
    email: string
  }
  review: string
  shippingInfo: ShippingInfoSchema
  date: Date
  orderId: string
  order?: OrderSchema
  giveawayId: string
  giveaway?: GiveawaySchema
  surveyId: string
  survey?: SurveySchema
}

export type ShippingInfoSchema = {
  fullname: string
  contactName: string
  email: string
  address1: string
  address2?: string | null
  city: string
  stateProvince: string
  zipCode: string
}

export async function POST(req: Request) {
  try {

    // detsrtucture data from the incoming request
    const { 
      order,
      submittedReview, 
      survey, 
      gift,
      shippingInfo
    }: { 
      order: OrderSchema,
      submittedReview: ReviewForm, 
      survey: SurveySchema, 
      gift: GiveawaySchema,
      shippingInfo: ShippingInfoSchema
    } = await req.json();

    const reviewerInfo = {
      name: submittedReview.name,
      phone: submittedReview.phoneNum,
      email: submittedReview.email,
    }
    
    // Create and save data on the database
    const review: ReviewsSchema | null = await db.review.create({
      data: {
        rating: submittedReview.rating,
        orderNum: order.orderNum,
        reviewerInfo: reviewerInfo,
        review: submittedReview.review,
        shippingInfo: shippingInfo,
        date: new Date(),
        orderId: order.id,
        giveawayId: gift.id,
        surveyId: survey.id,
      }
    })

    return NextResponse.json(review, { status: 200 }); // Respond with the created order
  } catch (error) {
    console.log("[POST REVIEW]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
