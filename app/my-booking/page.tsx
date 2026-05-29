"use client";

import { useState } from "react";

export default function MyBookingPage() {
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function checkBooking() {
    const response = await fetch("/api/my-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!data.found) {
      setBooking(null);
      setMessage("No booking found for this email");
      return;
    }

    setBooking(data.booking);
    setMessage("");
  }

  function statusColor(status: string) {
    if (status === "Approved") return "bg-green-500 text-white";
    if (status === "Rejected") return "bg-red-500 text-white";
    if (status === "Completed") return "bg-blue-500 text-white";
    return "bg-yellow-400 text-[#111827]";
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#111827] via-[#1a2332] to-[#202d3f] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-10">
        <h1 className="text-4xl font-serif text-center">Check My Booking</h1>

        <p className="text-gray-300 text-center mt-3">
          Enter your email to check your session status
        </p>

        <div className="space-y-5 mt-10">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

          <button
            onClick={checkBooking}
            className="w-full bg-[#8fa8c7] text-[#111827] py-4 rounded-2xl font-medium"
          >
            Check Booking
          </button>

          {message && <p className="text-red-300 text-center">{message}</p>}

          {booking && (
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <p>
                <span className="text-gray-400">Name:</span> {booking.name}
              </p>

              <div>
                <span className="text-gray-400">Status:</span>{" "}
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor(booking.status)}`}>
                  {booking.status || "Pending"}
                </span>
              </div>

              <p>
                <span className="text-gray-400">Date:</span>{" "}
                {booking.date || "Not selected"}
              </p>

              <p>
                <span className="text-gray-400">Time:</span>{" "}
                {booking.time || "Not selected"}
              </p>

              <p>
                <span className="text-gray-400">Timezone:</span>{" "}
                {booking.timezone || "Not selected"}
              </p>

              <p>
                <span className="text-gray-400">Duration:</span>{" "}
                {booking.duration}
              </p>

              {(booking.status === "Approved" ||booking.status === "Completed") && booking.meetingLink ? (
                <a
                  href={booking.meetingLink}
                  target="_blank"
                  className="block mt-5 bg-[#8fa8c7] text-[#111827] text-center py-3 rounded-2xl font-medium"
                >
                  Join Meeting
                </a>
              ) : (
                <p className="text-yellow-300 mt-5">
                  Meeting link will appear after approval.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}