export default function Home() {

  return (

    <main className="min-h-screen bg-gradient-to-b from-[#111827] via-[#1a2332] to-[#202d3f] text-white px-6 py-10">

      {/* Navbar */}
      <nav className="flex items-center justify-between max-w-6xl mx-auto mb-24">

        <h1 className="text-3xl font-serif">
          HearMe
        </h1>

        <div className="flex gap-8 text-gray-300">

          <a
            href="/"
            className="hover:text-white transition"
          >
            Home
          </a>

          <a
            href="/book"
            className="hover:text-white transition"
          >
            Book
          </a>

          <a
            href="/admin"
            className="hover:text-white transition"
          >
            Admin
          </a>

        </div>

      </nav>



      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center pt-10">

        <div className="w-40 h-40 mx-auto rounded-full bg-[#8fa8c7]/20 blur-3xl absolute left-1/2 -translate-x-1/2"></div>

        <h1 className="text-6xl md:text-7xl font-serif leading-tight relative">

          Sometimes you just
          need someone
          to listen.

        </h1>

        <p className="text-gray-300 text-xl mt-8 max-w-2xl mx-auto leading-relaxed">

          Calm conversations for people across the world.
          Talk openly, feel heard, and connect human to human.

        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-12">

  <a href="/book">

    <button className="bg-[#8fa8c7] text-[#111827] px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition">

      Start a Conversation

    </button>

  </a>



  <a href="/my-booking">

    <button className="border border-white/20 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition">

      Check My Booking

    </button>

  </a>

</div>

      </section>



      {/* Features */}
      <section className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl mb-4">
            Anonymous
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Speak freely without pressure or judgment.
          </p>

        </div>



        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl mb-4">
            Global
          </h2>

          <p className="text-gray-300 leading-relaxed">
            People from different countries can connect and talk.
          </p>

        </div>



        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-2xl mb-4">
            Calm Space
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Relaxed conversations designed to feel peaceful and human.
          </p>

        </div>

      </section>



      {/* Footer */}
      <footer className="text-center text-gray-400 mt-32 pb-10">

        © 2026 HearMe. All rights reserved.

      </footer>

    </main>

  );

}