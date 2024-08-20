"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { ReviewsSchema } from "../../create/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find order on the database
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        surveys: {
          select: {
            reviews: {
              include: { giveaway: true, survey: true, }
            }
          }
        },
      }
    })
    const reviews: ReviewsSchema[] | undefined = user?.surveys.flatMap(survey => survey.reviews)

    // Document not found
    if (!reviews) return NextResponse.json(reviews, { status: 404 });
    // Return Document
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
