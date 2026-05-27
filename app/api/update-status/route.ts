import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDI2NTgsImV4cCI6MjA5NTM3ODY1OH0.yz6B1fY6yXlrKgQ_lTemiUptufErBETitkteDin0HRI"
);
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  const body = await req.json();

  const { id, status } = body;
  if (status === "Approved") {

  await resend.emails.send({

    from: "HearMe <onboarding@resend.dev>",

    to: body.email,

    subject: "Booking Approved",

    html: `

      <h1>Your HearMe booking is approved</h1>

      <p>Hello,</p>

      <p>Your booking request has been approved successfully.</p>

      <p>Please check your booking portal for meeting details.</p>

      <br/>

      <p>— HearMe Team</p>

    `,

  });

}
if (status === "Rejected") {

  await resend.emails.send({

    from: "HearMe <onboarding@resend.dev>",

    to: body.email,

    subject: "Booking Update",

    html: `

      <h1>Booking Update</h1>

      <p>Hello,</p>

      <p>Unfortunately your booking could not be approved.</p>

      <p>You may try again later.</p>

      <br/>

      <p>— HearMe Team</p>

    `,

  });

}

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Status update failed",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Status updated successfully",
  });
}