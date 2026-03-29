export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">
          Secure Image Transmission using
          <span className="text-primary"> Deep Learning & Cryptography</span>
        </h1>
        <p className="text-gray-400 mb-8">
          A deep learning–driven image encryption system ensuring secure
          communication over untrusted networks.
        </p>
        <a
          href="/encrypt"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold"
        >
          Start Encryption
        </a>
      </div>
    </section>
  );
}
