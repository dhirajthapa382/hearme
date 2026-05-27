export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#172033] to-[#22304a] text-white px-6 py-10 overflow-hidden">

      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif">HearMe</h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="/">Home</a>
          <a href="/book">Book</a>
          <a href="/my-booking">My Booking</a>
          <a href="/admin">Admin</a>
        </div>
      </nav>

      <section className="relative max-w-6xl mx-auto pt-28 text-center">

        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8fa8c7]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute top-52 right-10 w-56 h-56 bg-blue-300/10 rounded-full blur-2xl"></div>

        <p className="relative z-10 text-[#8fa8c7] tracking-[0.35em] uppercase text-sm mb-6">
          Real Human Conversations
        </p>

        <h1 className="relative z-10 text-6xl md:text-8xl font-serif leading-tight">
          You talk.
          <br />
          Someone truly listens.
        </h1>

        <p className="relative z-10 text-gray-300 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
          HearMe is a calm space for people across the world to have private,
          friendly conversations when they simply need to feel heard.
        </p>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-5 mt-12">
          <a href="/book">
            <button className="bg-[#8fa8c7] text-[#111827] px-9 py-4 rounded-full text-lg font-medium hover:scale-105 transition shadow-lg">
              Start a Conversation
            </button>
          </a>

          <a href="/my-booking">
            <button className="border border-white/20 px-9 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition">
              Check My Booking
            </button>
          </a>
        </div>

        <div className="relative z-10 mt-20 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <p className="text-4xl mb-4">🌙</p>
            <h3 className="text-xl font-semibold">Late-night talks</h3>
            <p className="text-gray-300 mt-3">
              For moments when your mind feels too full.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <p className="text-4xl mb-4">💬</p>
            <h3 className="text-xl font-semibold">No judgment</h3>
            <p className="text-gray-300 mt-3">
              Speak freely in a peaceful and respectful space.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <p className="text-4xl mb-4">🌍</p>
            <h3 className="text-xl font-semibold">Across the world</h3>
            <p className="text-gray-300 mt-3">
              Built for people from different countries and time zones.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-32 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-serif leading-tight">
            Not therapy.
            <br />
            Just a real conversation.
          </h2>

          <p className="text-gray-300 text-lg mt-6 leading-relaxed">
            Sometimes you do not need a solution immediately. You just need a
            quiet, kind voice and a space where your thoughts are heard without
            pressure.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[40px] p-10">
          <div className="space-y-5 text-gray-200">
            <p>✓ Private conversations</p>
            <p>✓ Friendly listening</p>
            <p>✓ Global booking</p>
            <p>✓ Meeting link after approval</p>
            <p>✓ Calm and simple experience</p>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-400 mt-32 pb-10">
        © 2026 HearMe — Real conversations. Real people.
      </footer>
    </main>
  );
}