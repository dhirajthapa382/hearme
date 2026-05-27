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



  async function updateStatus(
    id: number,
    status: string,
    email: string
  ) {

    await fetch("/api/update-status", {

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

    getBookings();

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

          <h1 className="text-5xl font-serif">
            Admin Dashboard
          </h1>

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

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-3xl">
                  {booking.name}
                </h2>

                <p className="text-gray-300 mt-2">
                  {booking.email}
                </p>

              </div>



              <select
                value={booking.status || "Pending"}
                onChange={(e) =>
                  updateStatus(
                    booking.id,
                    e.target.value,
                    booking.email
                  )
                }
                className="bg-[#8fa8c7] text-[#111827] px-4 py-2 rounded-full text-sm font-medium outline-none"
              >

                <option>Pending</option>
                <option>Approved</option>
                <option>Completed</option>
                <option>Rejected</option>

              </select>

            </div>



            <div className="grid grid-cols-2 gap-6 mt-8 text-gray-200">

              <div>

                <p className="text-gray-400 text-sm">
                  Country
                </p>

                <p className="mt-2 text-lg">
                  🌍 {booking.country}
                </p>

              </div>



              <div>

                <p className="text-gray-400 text-sm">
                  Duration
                </p>

                <p className="mt-2 text-lg">
                  ⏱ {booking.duration}
                </p>

              </div>



              <div>

                <p className="text-gray-400 text-sm">
                  Date
                </p>

                <p className="mt-2 text-lg">
                  📅 {booking.date || "Not selected"}
                </p>

              </div>



              <div>

                <p className="text-gray-400 text-sm">
                  Time
                </p>

                <p className="mt-2 text-lg">
                  🕒 {booking.time || "Not selected"}
                </p>

              </div>



              <div>

                <p className="text-gray-400 text-sm">
                  Timezone
                </p>

                <p className="mt-2 text-lg">
                  🌐 {booking.timezone || "Not selected"}
                </p>

              </div>

            </div>



            <div className="mt-8">

              <p className="text-gray-400 text-sm mb-3">
                Message
              </p>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-200 leading-relaxed">

                {booking.message || "No message"}

              </div>

            </div>



            <div className="mt-6">

              <p className="text-gray-400 text-sm mb-3">
                Meeting Link
              </p>

              <input
                type="text"
                placeholder="Paste Google Meet / Zoom link"
                defaultValue={booking.meetingLink || ""}
                onBlur={async (e) => {

                  await fetch("/api/update-meeting-link", {

                    method: "POST",

                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      id: booking.id,
                      meetingLink: e.target.value,
                    }),

                  });

                  alert("Meeting link saved");

                }}
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
              />

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}