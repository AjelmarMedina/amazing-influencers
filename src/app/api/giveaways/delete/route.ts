"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { GiveawaySchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { id }: { id: string } = await req.json();
    
    // delete document from database
    const giveaway: GiveawaySchema = await db.giveaway.delete({
      where: {
        id: id
      }
    })

    // Document not found
    if (!giveaway) return NextResponse.json(giveaway, { status: 404 });
    // Return Document
    return NextResponse.json(giveaway, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
