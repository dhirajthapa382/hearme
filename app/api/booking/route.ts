import nodemailer from "nodemailer";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgwMjY1OCwiZXhwIjoyMDk1Mzc4NjU4fQ.Pr_3-Toxr7bKuHb5wU6yZYBBg2LHc6aNv72u82fB4YQ"

);


const resend = new Resend("re_FvLKTB8R_Q8FAGLMgrJL5MGoxZQQgLM59");
console.log("USER:", process.env.GMAIL_USER);
console.log("PASS:", process.env.GMAIL_APP_PASSWORD ? "FOUND" : "MISSING");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
 

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: body.name,
          email: body.email,
          country: body.country,
          duration: body.duration,
          date: body.date,
          time: body.time,
          timezone: body.timezone,
          message: body.message,
          status: body.status,
        },
      ])
      .select();
console.log("INSERT DATA:", data);
console.log("INSERT ERROR:", error);

    if (error) {
      console.log(error);
      return NextResponse.json({ message: error.message });
    }

    try {
      console.log("Customer email:", body.email);
console.log("START EMAIL");
      await transporter.sendMail({

  from: process.env.GMAIL_USER,
    to: body.email,
subject: "🎧 HearMe Booking Confirmation",
html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">

  <h1 style="color:#4F46E5; text-align:center;">
    🎧 HearMe Booking Confirmed
  </h1>

  <p>Hello <strong>${body.name}</strong>,</p>

  <p>
    Thank you for booking a conversation with <strong>HearMe</strong>.
    Your request has been successfully received.
  </p>

  <div style="background:#f4f4f4; padding:15px; border-radius:10px; margin:20px 0;">
    <h3>📅 Booking Details</h3>

    <p><strong>Date:</strong> ${body.date}</p>
    <p><strong>Time:</strong> ${body.time}</p>
    <p><strong>Timezone:</strong> ${body.timezone}</p>
    <p><strong>Duration:</strong> ${body.duration}</p>
  </div>

  <p>
    We will review your booking and contact you shortly with the next steps.
  </p>

  <div style="background:#eef7ff; padding:15px; border-radius:10px; margin-top:20px;">
    <strong>💙 A Note From HearMe</strong>
    <p>
      Sometimes all we need is someone who genuinely listens.
      Thank you for trusting HearMe.
    </p>
  </div>

  <br>

  <p>
    Best Regards,<br>
    <strong>HearMe Team</strong>
  </p>

  <hr>

  <p style="font-size:12px; color:gray;">
    HearMe provides supportive listening and human conversation.
    It is not a therapy, counseling, medical, or crisis intervention service.
  </p>

</div>
`, });
await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: "thapadhiraj468@gmail.com",
  subject: "🚀 New HearMe Booking",
  html: `
    <h2>New Booking Received</h2>

    <p><strong>Name:</strong> ${body.name}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Country:</strong> ${body.country}</p>
    <p><strong>Date:</strong> ${body.date}</p>
    <p><strong>Time:</strong> ${body.time}</p>
    <p><strong>Timezone:</strong> ${body.timezone}</p>
    <p><strong>Duration:</strong> ${body.duration}</p>

    <p><strong>Message:</strong></p>
    <p>${body.message || "No message provided"}</p>
  `,
});
console.log("EMAIL SENT");
} catch (emailError) {
      console.log("Email failed, but booking saved:", emailError);
    }

    return NextResponse.json({
      message: "Booking saved successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server Error" });
  }
}