"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { ProductSchema } from "../get/route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { id }: { id: string } = await req.json();
    
    // delete document from database
    const product: ProductSchema = await db.product.delete({
      where: {
        id: id
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
