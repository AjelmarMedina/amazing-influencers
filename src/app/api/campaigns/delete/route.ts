"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { Campaign } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { id }: { id: string } = await req.json();
    
    // delete document from database
    const campaign: Campaign = await db.campaign.delete({
      where: {
        id: id
      }
    })

    // Document not found
    if (!campaign) return NextResponse.json(campaign, { status: 404 });
    // Return Document
    return NextResponse.json(campaign, { status: 200 });
  } catch (error) {
    console.log("[DEL CAMPAIGN]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
