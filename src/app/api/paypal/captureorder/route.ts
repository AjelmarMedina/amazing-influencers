import paypal from '@paypal/checkout-server-sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { orderID } = await req.json();

  if(!orderID)
    return NextResponse.json({success: false, message: "Please Provide Order ID"})

  // TODO: Production PayPal API
  // const apiHost = process.env.NODE_ENV == production 
  // ? "https://api.m.paypal.com" 
  // : "https://api.m.sandbox.paypal.com"
  const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`
    },
  })

  if (!response.ok) 
    return NextResponse.json({success: false, message: "Some Error Occured at backend"}, {status: 500})

  return NextResponse.json({success: true}, {status: 200});
}