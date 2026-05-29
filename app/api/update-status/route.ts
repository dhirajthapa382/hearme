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

    const { id, status, email } = body;

    const { error } = await supabase
      .from("bookings")
      .update({
        status: status,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }

    try {
      if (status === "Approved") {
        await resend.emails.send({
          from: "HearMe <onboarding@resend.dev>",
          to: email,
          subject: "Your HearMe Booking is Approved",
          html: `
            <h1>Your HearMe Booking is Approved</h1>
            <p>Hello,</p>
            <p>Your booking has been approved successfully.</p>
            <p>Please visit the Check My Booking page to see your meeting link.</p>
            <br/>
            <p>— HearMe Team</p>
          `,
        });
      }

      if (status === "Rejected") {
        await resend.emails.send({
          from: "HearMe <onboarding@resend.dev>",
          to: email,
          subject: "HearMe Booking Update",
          html: `
            <h1>Booking Update</h1>
            <p>Hello,</p>
            <p>Unfortunately, your booking could not be approved.</p>
            <p>Your refund will be processed within 5 working days.</p>
            <br/>
            <p>— HearMe Team</p>
          `,
        });
      }
    } catch (emailError) {
      console.log("Email failed but status updated:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}