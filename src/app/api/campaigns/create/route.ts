"use server";

import db from "@/lib/prisma";

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { Campaign } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userId, name, delay }: { userId: string, name: string, delay: string } = await req.json();
    
    // find all giveaways on the database
    const campaign: Campaign = await db.campaign.create({
      data: {
        id: new ObjectId().toString(),
        name,
        delay,
        userId,
      }
    })

    // Document not found
    if (!campaign) return NextResponse.json(campaign, { status: 404 });
    // Return Document
    return NextResponse.json(campaign, { status: 200 });
  } catch (error) {
    console.log("[POST CAMPAIGN]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
