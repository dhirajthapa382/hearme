export default function FAQPage() {
  return (
    <main className="min-h-screen p-10 text-white">
      <h1 className="text-4xl mb-6">FAQ</h1>

      <div className="space-y-6">

        <div>
          <h2 className="font-bold">Is HearMe therapy?</h2>
          <p>No. HearMe is a listening service, not therapy.</p>
        </div>

        <div>
          <h2 className="font-bold">Are conversations private?</h2>
          <p>Yes. We respect user privacy.</p>
        </div>

        <div>
          <h2 className="font-bold">Who can use HearMe?</h2>
          <p>Anyone who needs someone to talk to.</p>
        </div>

        <div>
          <h2 className="font-bold">How do I book?</h2>
          <p>Go to the booking page and complete payment.</p>
        </div>

      </div>
    </main>
  );
}