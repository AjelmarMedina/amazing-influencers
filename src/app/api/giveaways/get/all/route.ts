"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { GiveawaySchema } from "../route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find all giveaways on the database
    const userGiveaways = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: { 
        giveaways: true
      }
    })
    const giveaways: GiveawaySchema[] | undefined = userGiveaways?.giveaways;

    // Document not found
    if (!giveaways) return NextResponse.json(giveaways, { status: 404 });
    // Return Document
    return NextResponse.json(giveaways, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
