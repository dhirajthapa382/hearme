import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: "rzp_test_SuNxXMMxIKwlyZ",
  key_secret: "024lEur2wy6lmCySJ61vzjxX",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await razorpay.orders.create({
      amount: body.amount * 100,
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Order creation failed" });
  }
}