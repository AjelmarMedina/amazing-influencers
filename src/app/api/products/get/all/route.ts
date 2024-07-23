"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";
import { ProductSchema } from "../route";

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { userEmail } = await req.json();
    
    // find all products on the database
    const userProducts = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: { 
        products: true 
      }
    })
    const products: ProductSchema[] | undefined = userProducts?.products;

    // Document not found
    if (!products) return NextResponse.json(products, { status: 404 });
    // Return Document
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("[GET SURVEY]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
