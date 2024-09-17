import paypal from '@paypal/checkout-server-sdk';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { order_price, user_id } = await req.json();

	if(!order_price || !user_id)
		return NextResponse.json({success: false, message: "Please Provide order_price And User ID"}, {status: 404});

  try{
    // TODO: Production PayPal API
    // const apiHost = process.env.NODE_ENV == production 
    // ? "https://api.m.paypal.com" 
    // : "https://api.m.sandbox.paypal.com"
    const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: order_price+"",
            },
          },
        ],
      })
    })

    console.log(response);

    if (!response.ok) {
      console.log("RES: ", response)
      return NextResponse.json({success: false, message: "Some Error Occured at backend"}, {status: 500})
    }

    const { id: order_id } = await response.json();

    return NextResponse.json({success: true, data: order_id}, {status: 200});
  } 
  catch(err){
    console.log("Err at Create Order: ", err)
    return NextResponse.json({success: false, message: "Could Not Found the user"}, {status: 500})
  }

}