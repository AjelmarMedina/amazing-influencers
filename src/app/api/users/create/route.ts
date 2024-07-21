"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { GiveawaySchema } from "../../giveaways/get/route";
import { OrderSchema } from "../../orders/get/route";
import { ProductSchema } from "../../products/get/route";
import { SurveySchema } from "../../surveys/get/route";

export type UserSchema = {
  id: string
  email: string
  company: string
  firstName: String
  lastName: String
  surveys?: Array<SurveySchema>
  products?: Array<ProductSchema>
  orders?: Array<OrderSchema>
  giveaways?: Array<GiveawaySchema>
}

export async function POST(req: Request) {
  try {

    // detsrtucture data from the incoming request
    const { emailAddress, company, firstName, lastName } = await req.json();

    // Create and save data on the database
    const user: UserSchema = await db.user.create({
      data: {
        email: emailAddress,
        company: company,
        firstName: firstName,
        lastName: lastName,
      }
    })

    return NextResponse.json(user, { status: 200 }); // Respond with the created order
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
