import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  const body = await req.json();

  const { email, name, date, time } = body;

  try {

    await resend.emails.send({

      from: "HearMe <onboarding@resend.dev>",

      to: email,

      subject: "Your booking is confirmed",

      html: `
        <h1>Hello ${name}</h1>

        <p>Your conversation booking has been confirmed.</p>

        <p>Date: ${date}</p>

        <p>Time: ${time}</p>

        <p>Thank you for using HearMe.</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
    });

  }

}