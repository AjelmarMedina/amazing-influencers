"use server";

import AWS from "aws-sdk";
import { NextResponse } from "next/server";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-north-1",
    ses: {
        params: {
            
        }
    }
});
AWS.config.getCredentials(function (error) {
    if (error) {
        console.log(error.stack);
    }
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export async function POST(req: Request) {
  try {
    // detsrtucture data from the incoming request
    const { name, email, subject, message }: { name: string, email: string, subject: string, message: string } = await req.json();
    
    const params = {
        Destination: {
          ToAddresses: [
            "ajelmarmedina+amazingInfluencers@gmail.com", 
            "cbc.saif+amazinginfluencers@gmail.com", 
            "info.amazinginfluencers@gmail.com", 
            "support@amazinginfluencers.com",
          ],
        },
        Message: {
          Body: {
            Text: {
              Data: `New message:\n---\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            },
          },
          Subject: { Data: `Contact Form Message: ${subject}` },
        },
        Source: "contact-us@amazinginfluencers.com",
      };
      
      await ses.sendEmail(params).promise();
      return new NextResponse("Successfully sent email", { status: 200 });
  } catch (error) {
    console.log("[POST EMAIL]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}
