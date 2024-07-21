"use server";

import { OrderSchema } from "@/app/dashboard/(administration)/orders/page";
import db from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { orderNum } = await req.json();
    
    /* 
    {
      id          String   @id @default(auto()) @map("_id") @db.ObjectId
      orderNum    String   @unique
      date        DateTime
      email       String
      fullName    String
      phone       String
      marketplace String
      campaign    String
      created     DateTime
      productId   Int // `products` - product purcheased for the order
      surveyCode  String // `surveys` - survey code is fetched based on the product of the specific order
      userId      String // `users` - producst ordered from
    }
    */
    if (orderNum === "888-5049177-9546820") {
      const sample = Buffer.from(orderNum).toString("base64url")
      return NextResponse.json({
        id: "0",
        orderNum: orderNum,
        date: new Date(),
        email: "test@example.com",
        fullName: "John Doe",
        phone: "+63 912 345 6789",
        marketplace: "",
        campaign: "",
        created: new Date(),
        productId: sample,
        surveyCode: sample,
        userId: sample,
      } satisfies OrderSchema, { status: 200 })
    }

    // find order on the database
    const order: OrderSchema | null = await db.orders.findUnique({
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
