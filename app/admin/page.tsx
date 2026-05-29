"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAllowed, setIsAllowed] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const password = prompt("Enter Admin Password");

    if (password === "kingthapa101") {
      setIsAllowed(true);
      getBookings();
    }
  }, []);

  async function getBookings() {
    const response = await fetch("/api/get-bookings");
    const data = await response.json();
    setBookings(data);
  }

  async function updateStatus(id: number, status: string, email: string) {
    try {
      const response = await fetch("/api/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          email,
        }),
      });

      const data = await response.json();

      console.log("STATUS UPDATE:", data);

      if (data.success) {
        alert(`Booking marked as ${status}`);
      } else {
        alert(data.message || "Status update failed");
      }

      getBookings();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  async function saveMeetingLink(id: number, meetingLink: string) {
    try {
      const response = await fetch("/api/update-meeting-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          meetingLink,
        }),
      });

      const data = await response.json();

      console.log("MEETING LINK UPDATE:", data);

      if (data.success) {
        alert("Meeting link saved");
      } else {
        alert(data.message || "Meeting link update failed");
      }

      getBookings();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-[#111827] text-white flex items-center justify-center text-3xl">
        Access Denied
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#162033] to-[#1f2b3d] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-14">
        <div>
          <h1 className="text-5xl font-serif">Admin Dashboard</h1>
          <p className="text-gray-300 mt-3">
            Manage global conversation bookings
          </p>
        </div>

        <div className="bg-[#8fa8c7] text-[#111827] px-6 py-3 rounded-full font-medium">
          {bookings.length} Bookings
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {bookings.map((booking: any) => (
          <div
            key={booking.id}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md"
          >
            <div>
              <h2 className="text-3xl">{booking.name}</h2>
              <p className="text-gray-300 mt-2">{booking.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 text-gray-200">
              <div>
                <p className="text-gray-400 text-sm">Country</p>
                <p className="mt-2 text-lg">🌍 {booking.country}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Duration</p>
                <p className="mt-2 text-lg">⏱ {booking.duration}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="mt-2 text-lg">
                  📅 {booking.date || "Not selected"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="mt-2 text-lg">
                  🕒 {booking.time || "Not selected"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Timezone</p>
                <p className="mt-2 text-lg">
                  🌐 {booking.timezone || "Not selected"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Current Status</p>
                <p className="mt-2 text-lg">
                  {booking.status || "Pending"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 text-sm mb-3">Message</p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-200 leading-relaxed">
                {booking.message || "No message"}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 text-sm mb-4">Update Status</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    updateStatus(booking.id, "Pending", booking.email)
                  }
                  className="bg-yellow-400 text-black px-4 py-3 rounded-2xl font-medium"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(booking.id, "Approved", booking.email)
                  }
                  className="bg-green-500 text-white px-4 py-3 rounded-2xl font-medium"
                >
                  Approved
                </button>

                <button
                  onClick={() =>
                    updateStatus(booking.id, "Completed", booking.email)
                  }
                  className="bg-blue-500 text-white px-4 py-3 rounded-2xl font-medium"
                >
                  Completed
                </button>

                <button
                  onClick={() =>
                    updateStatus(booking.id, "Rejected", booking.email)
                  }
                  className="bg-red-500 text-white px-4 py-3 rounded-2xl font-medium"
                >
                  Rejected
                </button>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 text-sm mb-3">Meeting Link</p>

              <input
                type="text"
                placeholder="Paste Google Meet / Zoom link"
                defaultValue={booking.meetingLink || ""}
                onBlur={(e) =>
                  saveMeetingLink(booking.id, e.target.value)
                }
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
              />

              {booking.meetingLink && (
                <a
                  href={booking.meetingLink}
                  target="_blank"
                  className="inline-block mt-4 bg-green-500 text-white px-5 py-3 rounded-2xl"
                >
                  Open Meeting Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}