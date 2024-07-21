"use server";

import { SurveySchema } from "@/app/dashboard/(configuration)/surveys/page";
import db from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { surveyCode } = await req.json();
    
    console.log(surveyCode);
    

    // find order on the database
    const survey: SurveySchema | null = await db.surveys.findUnique({
      where: {
        surveyCode: surveyCode,
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
