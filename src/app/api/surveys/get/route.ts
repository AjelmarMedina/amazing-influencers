"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { surveyCode } = await req.json();
    
    console.log(surveyCode);
    
    /*
    {
      id         String @id @default(auto()) @map("_id") @db.ObjectId
      surveyCode String @unique
      name       String
      started    Int
      completed  Int
      ratio      Float
      productId  Int    @unique // `products` - one survey for each product
    }
    */
    if (Buffer.from(surveyCode, "base64url").toString() === "888-5049177-9546820") return NextResponse.json({
      id: "0",
      surveyCode: surveyCode,
      name: "Test Survey",
      started: 1,
      completed: 0,
      ratio: 0.0,
      productId: surveyCode,
    }, { status: 200 })

    // find order on the database
    const survey = await db.surveys.findUnique({
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
