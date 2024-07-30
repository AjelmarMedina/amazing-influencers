"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { OrderSchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const {
      orderNum,
      date,
      email,
      fullName,
      phone,
      marketplace,
      campaign,
      created,
      productId,
      surveyId,
      userId,
      user
    }: OrderSchema = await req.json();
    
    // find all giveaways on the database
    const order: OrderSchema = await db.order.create({
      data: {
        orderNum: orderNum,
        date: date,
        email: email,
        fullName: fullName,
        phone: phone,
        marketplace: marketplace,
        campaign: campaign ?? "",
        created: created,
        productId: productId,
        surveyId: surveyId,
        userId: userId,
      }
    })

    // Return Document
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
