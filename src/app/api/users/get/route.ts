"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { GiveawaySchema } from "../../giveaways/get/route";
import { ProductSchema } from "../../products/get/route";
import { UserSchema } from "../../users/create/route";

export type SurveySchema = {
  id: string
  surveyCode: string
  name: string
  started: number
  completed: number
  ratio: number
  userId: string
  user?: UserSchema
  productId: string
  product?: ProductSchema
  giveawayIds: Array<string>
  giveaways?: Array<GiveawaySchema>
}

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find order on the database
    const survey: UserSchema | null = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      include: { surveys: true, products: true, giveaways: true}
    })

    // Document not found
    if (!survey) return NextResponse.json(survey, { status: 404 });
    // Return Document
    return NextResponse.json(survey, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
