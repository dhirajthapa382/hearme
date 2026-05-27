import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDI2NTgsImV4cCI6MjA5NTM3ODY1OH0.yz6B1fY6yXlrKgQ_lTemiUptufErBETitkteDin0HRI"

);


const resend = new Resend("re_FvLKTB8R_Q8FAGLMgrJL5MGoxZQQgLM59");
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

    if (error) {
      console.log(error);
      return NextResponse.json({ message: error.message });
    }

    try {
      await resend.emails.send({
        from: "HearMe <onboarding@resend.dev>",
        to: body.email,
        subject: "Booking Confirmed",
        html: `
          <h1>HearMe Booking Confirmed</h1>
          <p>Hello ${body.name},</p>
          <p>Your booking has been received successfully.</p>
          <p><strong>Date:</strong> ${body.date}</p>
          <p><strong>Time:</strong> ${body.time}</p>
          <p><strong>Timezone:</strong> ${body.timezone}</p>
          <p><strong>Duration:</strong> ${body.duration}</p>
          <br/>
          <p>Thank you for choosing HearMe.</p>
        `,
      });
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