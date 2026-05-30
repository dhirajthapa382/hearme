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
    status,
  })
  .eq("id", id);

if (error) {
  return NextResponse.json({
    success: false,
    message: error.message,
  });
}

try {
  console.log("STATUS:", status);
  console.log("EMAIL:", email);

  if (status === "Approved") {
    const result = await resend.emails.send({
      from: "HearMe <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Your HearMe Conversation Has Been Confirmed",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:30px;line-height:1.8;">

          <h1 style="color:#22c55e;text-align:center;">
            🎉 Your HearMe Conversation Has Been Confirmed
          </h1>

          <p>Hello,</p>

          <p>
            Wonderful news! Your booking request has been approved.
          </p>

          <p>
            Thank you for choosing <strong>HearMe</strong>.
          </p>

          <div style="background:#f5f7ff;padding:20px;border-radius:12px;">
            <p>✅ Booking Status: Confirmed</p>
            <p>🔗 Visit <strong>My Booking</strong> to view your meeting link.</p>
          </div>

          <p>
            We look forward to speaking with you and providing a calm, meaningful conversation.
          </p>

          <p>
            Sometimes the most powerful thing someone can do is simply listen.
          </p>

          <br>

          <p>
            Warm Regards,<br>
            🎧 <strong>HearMe Team</strong>
          </p>

        </div>
      `,
    });

    console.log("RESEND RESULT:", result);
  }

  if (status === "Rejected") {
    await resend.emails.send({
      from: "HearMe <onboarding@resend.dev>",
      to: email,
      subject: "HearMe Booking Update",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:30px;line-height:1.8;">

          <h1 style="color:#ef4444;text-align:center;">
            Booking Update
          </h1>

          <p>Hello,</p>

          <p>
            Thank you for choosing HearMe.
          </p>

          <p>
            Unfortunately, we are unable to proceed with your booking at this time.
          </p>

          <div style="background:#fff5f5;padding:20px;border-radius:12px;">
            <p>💳 Refunds will be processed within 2 business days.</p>
            <p>🏦 The refund will be returned to your original payment method.</p>
          </div>

          <p>
            We sincerely appreciate your understanding.
          </p>

          <br>

          <p>
            Warm Regards,<br>
            🎧 <strong>HearMe Team</strong>
          </p>

        </div>
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
console.log(error);


return NextResponse.json({
  success: false,
  message: "Server error",
});

}
}