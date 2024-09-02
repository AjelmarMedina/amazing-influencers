"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { UserSchema } from "../../users/create/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find order on the database
    const survey: UserSchema | null = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        surveys: true,
        products: true,
        giveaways: true,
        orders: true
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
