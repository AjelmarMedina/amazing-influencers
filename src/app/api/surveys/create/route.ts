"use server";

import db from "@/lib/prisma";

import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { SurveySchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { name, userId, productId, giveawayIds }: { name: string, userId: string, productId: string, giveawayIds: string[]} = await req.json();
    
    // find all giveaways on the database
    const survey: SurveySchema = await db.survey.create({
      data: {
        id: new ObjectId().toString(),
        surveyCode: nanoid(6),
        name: name,
        started: 0,
        completed: 0,
        ratio: 0.0,
        userId: userId,
        productId: productId,
        giveawayIds: giveawayIds,
      }
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
