"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { UserSchema } from "../../users/create/route";

export type ProductSchema = {
  id: string
  productId: string
  name: string
  type: string
  userId: string
  user?: UserSchema
}

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { productId, userId } = await req.json();
    
    // find order on the database
    const product: ProductSchema | null = await db.product.findFirst({
      where: {
        productId: productId,
        userId: userId,
      },
      include: { user: true }
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
