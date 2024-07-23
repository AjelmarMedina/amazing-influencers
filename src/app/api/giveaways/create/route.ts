"use server";

import db from "@/lib/prisma";

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { GiveawaySchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userId, name, type, status }: { userId: string, name: string, type: string, status: boolean } = await req.json();
    
    // find all giveaways on the database
    const giveaway: GiveawaySchema = await db.giveaway.create({
      data: {
        id: new ObjectId().toString(),
        name: name,
        type: type,
        status: (status ? "Active" : "Inactive"),
        userId: userId,
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
