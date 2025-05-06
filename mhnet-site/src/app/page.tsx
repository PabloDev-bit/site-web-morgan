export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold tracking-wide text-blue-400 mb-4 drop-shadow-md">
          MHNET
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Redonnez vie à vos textiles.
        </p>
        <a
          href="#contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full font-medium text-lg shadow-lg"
        >
          Contactez-nous
        </a>
      </div>
    </main>
  );
}
