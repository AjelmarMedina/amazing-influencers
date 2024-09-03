"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { OrderSchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const {
      id,
    }: OrderSchema = await req.json();
    
    // find all giveaways on the database
    const order = await db.order.delete({
      where: {
        id: id,
      }
    })

    // Return Document
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
