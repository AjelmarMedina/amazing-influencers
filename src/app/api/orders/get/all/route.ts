"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { OrderSchema } from "../route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find all products on the database
    const userOrders = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: { 
        orders: true 
      }
    })
    const orders: OrderSchema[] | undefined = userOrders?.orders;

    // Document not found
    if (!orders) return NextResponse.json(orders, { status: 404 });
    // Return Document
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
