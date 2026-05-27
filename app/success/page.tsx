export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#111827] text-white flex items-center justify-center px-6">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-xl text-center">
        <h1 className="text-5xl mb-6">Booking Confirmed</h1>
        <p className="text-gray-300 text-lg">
          Thank you for booking. Your request has been received successfully.
        </p>

        <a
          href="/my-booking"
          className="inline-block mt-8 bg-[#8fa8c7] text-[#111827] px-6 py-3 rounded-full font-medium"
        >
          Check My Booking
        </a>
      </div>
    </main>
  );
}