"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { Campaign } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find all giveaways on the database
    const userCampaigns = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: { 
        campaigns: true
      }
    })
    const campaigns: Campaign[] | undefined = userCampaigns?.campaigns;

    // Document not found
    if (!campaigns) return NextResponse.json(campaigns, { status: 404 });
    // Return Document
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.log("[GET CAMPAIGNS]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
