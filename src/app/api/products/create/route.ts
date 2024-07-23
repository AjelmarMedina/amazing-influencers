"use server";

import db from "@/lib/prisma";

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { ProductSchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userId, name, type, productId }: { userId: string, name: string, type: string, productId: string} = await req.json();
    
    // find all giveaways on the database
    const product: ProductSchema = await db.product.create({
      data: {
        id: new ObjectId().toString(),
        name: name,
        type: type,
        productId: productId,
        userId: userId,
      }
    })

    // Document not found
    if (!product) return NextResponse.json(product, { status: 404 });
    // Return Document
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
