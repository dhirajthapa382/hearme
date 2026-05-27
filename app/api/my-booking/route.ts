import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDI2NTgsImV4cCI6MjA5NTM3ODY1OH0.yz6B1fY6yXlrKgQ_lTemiUptufErBETitkteDin0HRI"
);

export async function POST(req: Request) {
  const body = await req.json();

  const { email } = body;

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("email", email)
    .order("id", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return NextResponse.json({
      found: false,
      message: "No booking found",
    });
  }

  return NextResponse.json({
    found: true,
    booking: data[0],
  });
}