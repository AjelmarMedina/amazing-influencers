"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { Campaign } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userId } = await req.json();
    // TODO: Change identifier to survey id
    
    // find order on the database
    const campaigns: Campaign[]= await db.campaign.findMany({
      where: {
        userId: userId,
      },
      include: { user: true }
    })

    // Document not found
    if (!campaigns) return NextResponse.json(campaigns, { status: 404 });
    // Return Document
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.log("[GET CAMPAIGN]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
