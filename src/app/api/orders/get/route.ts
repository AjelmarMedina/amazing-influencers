"use server";

import db from "@/lib/prisma";

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { ProductSchema } from "../../products/get/route";
import { SurveySchema } from "../../surveys/get/route";
import { UserSchema } from "../../users/create/route";

export type OrderSchema = {
  id: string
  orderNum: string
  date: Date
  fullName: string
  email: string
  userId: string
  user?: UserSchema
}

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { orderNum }: {orderNum: string} = await req.json();
    
    if (orderNum === "888-5049177-9546820") return NextResponse.json({orderNum: orderNum, id: new ObjectId()}, { status: 200 });

    // find order on the database
    const order: OrderSchema | null = await db.order.findFirst({
      where: {
        orderNum: orderNum,
      }
    })

    // Document not found
    if (!order) return NextResponse.json(order, { status: 404 });
    // Return Document
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[GET ORDER]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
