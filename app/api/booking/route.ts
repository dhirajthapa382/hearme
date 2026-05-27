import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ryrsrrjfnmuitlccowvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cnNycmpmbm11aXRsY2Nvd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDI2NTgsImV4cCI6MjA5NTM3ODY1OH0.yz6B1fY6yXlrKgQ_lTemiUptufErBETitkteDin0HRI"
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log(body);

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
          message: body.message,
          status: body.status,
        },
      ])
      .select();

    if (error) {

      console.log(error);

      return NextResponse.json({
        message: error.message,
      });

    }

    return NextResponse.json({
      message: "Booking saved successfully",
      data,
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({
      message: "Server Error",
    });

  }

}