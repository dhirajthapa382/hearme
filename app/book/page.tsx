"use client";

import { useState } from "react";

export default function BookPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {

    try {

      setLoading(true);

      const response = await fetch("/api/booking", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          country,
          duration,
          date,
          time,
          timezone,
          message,
          status: "Pending",
        }),

      });

      const data = await response.json();

      console.log(data);

      window.location.href = "/success";

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-gradient-to-b from-[#111827] via-[#1a2332] to-[#202d3f] text-white flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-10">

        <h1 className="text-4xl font-serif text-center">
          Book a Conversation
        </h1>

        <p className="text-gray-300 text-center mt-3">
          Talk with someone who listens to you
        </p>

        <div className="space-y-5 mt-10">

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />



          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />



          {/* Country */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white"
          >

            <option value="" className="text-black">
              Select Country
            </option>

            <option className="text-black">Afghanistan</option>
            <option className="text-black">Albania</option>
            <option className="text-black">Algeria</option>
            <option className="text-black">Argentina</option>
            <option className="text-black">Armenia</option>
            <option className="text-black">Australia</option>
            <option className="text-black">Austria</option>
            <option className="text-black">Bangladesh</option>
            <option className="text-black">Belgium</option>
            <option className="text-black">Brazil</option>
            <option className="text-black">Bulgaria</option>
            <option className="text-black">Canada</option>
            <option className="text-black">Chile</option>
            <option className="text-black">China</option>
            <option className="text-black">Colombia</option>
            <option className="text-black">Croatia</option>
            <option className="text-black">Czech Republic</option>
            <option className="text-black">Denmark</option>
            <option className="text-black">Egypt</option>
            <option className="text-black">Estonia</option>
            <option className="text-black">Finland</option>
            <option className="text-black">France</option>
            <option className="text-black">Germany</option>
            <option className="text-black">Greece</option>
            <option className="text-black">Hong Kong</option>
            <option className="text-black">Hungary</option>
            <option className="text-black">Iceland</option>
            <option className="text-black">India</option>
            <option className="text-black">Indonesia</option>
            <option className="text-black">Iran</option>
            <option className="text-black">Iraq</option>
            <option className="text-black">Ireland</option>
            <option className="text-black">Israel</option>
            <option className="text-black">Italy</option>
            <option className="text-black">Japan</option>
            <option className="text-black">Kenya</option>
            <option className="text-black">Malaysia</option>
            <option className="text-black">Mexico</option>
            <option className="text-black">Morocco</option>
            <option className="text-black">Netherlands</option>
            <option className="text-black">New Zealand</option>
            <option className="text-black">Nigeria</option>
            <option className="text-black">Norway</option>
            <option className="text-black">Pakistan</option>
            <option className="text-black">Philippines</option>
            <option className="text-black">Poland</option>
            <option className="text-black">Portugal</option>
            <option className="text-black">Qatar</option>
            <option className="text-black">Romania</option>
            <option className="text-black">Russia</option>
            <option className="text-black">Saudi Arabia</option>
            <option className="text-black">Singapore</option>
            <option className="text-black">South Africa</option>
            <option className="text-black">South Korea</option>
            <option className="text-black">Spain</option>
            <option className="text-black">Sri Lanka</option>
            <option className="text-black">Sweden</option>
            <option className="text-black">Switzerland</option>
            <option className="text-black">Thailand</option>
            <option className="text-black">Turkey</option>
            <option className="text-black">Ukraine</option>
            <option className="text-black">United Arab Emirates</option>
            <option className="text-black">United Kingdom</option>
            <option className="text-black">United States</option>
            <option className="text-black">Vietnam</option>

          </select>



          {/* Duration */}
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white"
          >

            <option value="" className="text-black">
              Select Duration
            </option>

            <option className="text-black">15 Minutes</option>
            <option className="text-black">30 Minutes</option>
            <option className="text-black">60 Minutes</option>

          </select>



          {/* Date */}
          
<input
  type="date"
  min={new Date().toISOString().split("T")[0]}
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white"
/>



          
          
{/* Time */}
<input
  type="text"
  placeholder="Example: 7:30 PM"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
 />
 {/* Timezone */}
<select
  value={timezone}
  onChange={(e) => setTimezone(e.target.value)}
  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white"
>

  <option value="" className="text-black">
    Select Timezone
  </option>

  <option className="text-black">
    IST (India)
  </option>

  <option className="text-black">
    EST (USA Eastern)
  </option>

  <option className="text-black">
    PST (USA Pacific)
  </option>

  <option className="text-black">
    GMT (United Kingdom)
  </option>

  <option className="text-black">
    CET (Europe)
  </option>

  <option className="text-black">
    MSK (Russia Moscow)
  </option>

  <option className="text-black">
    JST (Japan)
  </option>

  <option className="text-black">
    GST (UAE Dubai)
  </option>

</select>



          {/* Message */}
          <textarea
            placeholder="Write something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none resize-none"
          />



          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#8fa8c7] text-[#111827] py-4 rounded-2xl font-medium disabled:opacity-50"
          >

            {loading ? "Sending..." : "Continue"}

          </button>

        </div>

      </div>

    </main>

  );

}