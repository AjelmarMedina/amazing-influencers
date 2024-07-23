"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { SurveySchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { id }: { id: string } = await req.json();
    
    // delete document from database
    const survey: SurveySchema = await db.survey.delete({
      where: {
        id: id
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
