import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgwMjY1OCwiZXhwIjoyMDk1Mzc4NjU4fQ.Pr_3-Toxr7bKuHb5wU6yZYBBg2LHc6aNv72u82fB4YQ"
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