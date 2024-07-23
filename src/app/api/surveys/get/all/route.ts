"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { SurveySchema } from "../route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find order on the database
    const userSurveys = await db.user.findUnique({
      where: {
        email: userEmail
      },
      select: {
        surveys: true
      }
    })
    const surveys: SurveySchema[] | undefined = userSurveys?.surveys;

    // Document not found
    if (!surveys) return NextResponse.json(surveys, { status: 404 });
    // Return Document
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
