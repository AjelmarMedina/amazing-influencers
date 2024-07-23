"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { UserSchema } from "../../users/create/route";

export type GiveawaySchema = {
  id: string
  name: string
  type: string
  status: string
  userId: string
  user?: UserSchema
}

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userId } = await req.json();
    // TODO: Change identifier to survey id
    
    // find order on the database
    const giveaways: Array<GiveawaySchema> | null = await db.giveaway.findMany({
      where: {
        userId: userId,
      },
      include: { user: true }
    })

    // Document not found
    if (!giveaways) return NextResponse.json(giveaways, { status: 404 });
    // Return Document
    return NextResponse.json(giveaways, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
