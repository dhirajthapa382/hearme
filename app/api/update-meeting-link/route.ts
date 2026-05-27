import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDI2NTgsImV4cCI6MjA5NTM3ODY1OH0.yz6B1fY6yXlrKgQ_lTemiUptufErBETitkteDin0HRI"
);

export async function POST(req: Request) {
  const body = await req.json();

  const { id, meetingLink } = body;

  const { error } = await supabase
    .from("bookings")
    .update({ meetingLink })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}