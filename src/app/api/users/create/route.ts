"use server";

import db from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    // detsrtucture data from the incoming request
    const { emailAddress, company, firstName, lastName } = await req.json();

    // Create and save data on the database
    const user = await db.users.create({
      data: {
        email: emailAddress,
        company: company,
        firstName: firstName,
        lastName: lastName,
      }
    })

    return NextResponse.json(user, { status: 200 }); // Respond with the created order
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
