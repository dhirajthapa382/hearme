"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [timezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getAmount() {
    if (duration === "15 Minutes - $5") return 5;
    if (duration === "30 Minutes - $10") return 10;
    if (duration === "60 Minutes - $20") return 20;
    return 0;
  }

  function checkForm() {
    if (!name || !email || !country || !duration || !date || !time || !timezone) {
      alert("Please fill all required fields");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
      return false;
    }

    return true;
  }

  async function saveBooking(status: string) {
    await fetch("/api/booking", {
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
        status,
      }),
    });

    window.location.href = "/success";
  }

  async function handleRazorpayPayment() {
    if (!checkForm()) return;

    try {
      setLoading(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: getAmount(),
        }),
      });

      const order = await orderResponse.json();

      const options = {
        key: "rzp_test_SuNxXMMxIKwlyZ",
        amount: order.amount,
        currency: "USD",
        name: "HearMe",
        description: "Conversation Booking",
        order_id: order.id,

        handler: async function () {
          await saveBooking("Paid");
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert("Payment could not start");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AR3A_xntr6nV2xrirpCgyRGD5YjAtVD3d2pGt7DePA_kQRzEUDV4XN4mUwqydGszJrWw4Wnx1UPQUP-V",
        currency: "USD",
      }}
    >
      <main className="min-h-screen bg-gradient-to-b from-[#111827] via-[#1a2332] to-[#202d3f] text-white flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-10">
          <h1 className="text-4xl font-serif text-center">
            Book a Conversation
          </h1>

          <p className="text-gray-300 text-center mt-3">
            Talk with someone who listens to you
          </p>

          <div className="space-y-5 mt-10">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
            />

          
            
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
  <option className="text-black">Andorra</option>
  <option className="text-black">Angola</option>
  <option className="text-black">Argentina</option>
  <option className="text-black">Armenia</option>
  <option className="text-black">Australia</option>
  <option className="text-black">Austria</option>
  <option className="text-black">Azerbaijan</option>
  <option className="text-black">Bangladesh</option>
  <option className="text-black">Belgium</option>
  <option className="text-black">Bhutan</option>
  <option className="text-black">Bolivia</option>
  <option className="text-black">Bosnia and Herzegovina</option>
  <option className="text-black">Brazil</option>
  <option className="text-black">Bulgaria</option>
  <option className="text-black">Cambodia</option>
  <option className="text-black">Canada</option>
  <option className="text-black">Chile</option>
  <option className="text-black">China</option>
  <option className="text-black">Colombia</option>
  <option className="text-black">Croatia</option>
  <option className="text-black">Cyprus</option>
  <option className="text-black">Czech Republic</option>
  <option className="text-black">Denmark</option>
  <option className="text-black">Egypt</option>
  <option className="text-black">Estonia</option>
  <option className="text-black">Finland</option>
  <option className="text-black">France</option>
  <option className="text-black">Georgia</option>
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
  <option className="text-black">Jordan</option>
  <option className="text-black">Kazakhstan</option>
  <option className="text-black">Kenya</option>
  <option className="text-black">Kuwait</option>
  <option className="text-black">Kyrgyzstan</option>
  <option className="text-black">Laos</option>
  <option className="text-black">Latvia</option>
  <option className="text-black">Lebanon</option>
  <option className="text-black">Lithuania</option>
  <option className="text-black">Luxembourg</option>
  <option className="text-black">Malaysia</option>
  <option className="text-black">Maldives</option>
  <option className="text-black">Mexico</option>
  <option className="text-black">Moldova</option>
  <option className="text-black">Mongolia</option>
  <option className="text-black">Morocco</option>
  <option className="text-black">Myanmar</option>
  <option className="text-black">Nepal</option>
  <option className="text-black">Netherlands</option>
  <option className="text-black">New Zealand</option>
  <option className="text-black">Nigeria</option>
  <option className="text-black">North Korea</option>
  <option className="text-black">Norway</option>
  <option className="text-black">Oman</option>
  <option className="text-black">Pakistan</option>
  <option className="text-black">Palestine</option>
  <option className="text-black">Peru</option>
  <option className="text-black">Philippines</option>
  <option className="text-black">Poland</option>
  <option className="text-black">Portugal</option>
  <option className="text-black">Qatar</option>
  <option className="text-black">Romania</option>
  <option className="text-black">Russia</option>
  <option className="text-black">Saudi Arabia</option>
  <option className="text-black">Serbia</option>
  <option className="text-black">Singapore</option>
  <option className="text-black">Slovakia</option>
  <option className="text-black">Slovenia</option>
  <option className="text-black">South Africa</option>
  <option className="text-black">South Korea</option>
  <option className="text-black">Spain</option>
  <option className="text-black">Sri Lanka</option>
  <option className="text-black">Sweden</option>
  <option className="text-black">Switzerland</option>
  <option className="text-black">Syria</option>
  <option className="text-black">Taiwan</option>
  <option className="text-black">Tajikistan</option>
  <option className="text-black">Thailand</option>
  <option className="text-black">Turkey</option>
  <option className="text-black">Turkmenistan</option>
  <option className="text-black">Ukraine</option>
  <option className="text-black">United Arab Emirates</option>
  <option className="text-black">United Kingdom</option>
  <option className="text-black">United States</option>
  <option className="text-black">Uzbekistan</option>
  <option className="text-black">Vietnam</option>
  <option className="text-black">Yemen</option>
</select>



            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white"
            >
              <option value="" className="text-black">Select Duration</option>
              <option className="text-black">15 Minutes - $5</option>
              <option className="text-black">30 Minutes - $10</option>
              <option className="text-black">60 Minutes - $20</option>
            </select>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white"
            />

            <input
              type="text"
              placeholder="Example: 7:30 PM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
            />

            <input
              type="text"
              value={timezone}
              readOnly
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-gray-300"
            />

            <textarea
              placeholder="Write something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none resize-none"
            />

            <button
              onClick={handleRazorpayPayment}
              disabled={loading}
              className="w-full bg-[#8fa8c7] text-[#111827] py-4 rounded-2xl font-medium disabled:opacity-50"
            >
              {loading ? "Opening Card Payment..." : `Pay $${getAmount()} by Card`}
            </button>

            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "pill",
                label: "paypal",
              }}
              createOrder={async () => {
                if (!checkForm()) {
                  throw new Error("Form incomplete");
                }

                const response = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    amount: getAmount(),
                  }),
                });
                

                const order = await response.json();

                console.log(order);

                if (!order.id) {
                  alert("PayPal order creation failed");
                  throw new Error("No PayPal order id");
                }

                return order.id;
              }}
              onApprove={async (data) => {
                await fetch("/api/paypal/capture-order", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
                

               await saveBooking("pending");
              }}
            />
            
          </div>
        </div>
      </main>
    </PayPalScriptProvider>
  );
}